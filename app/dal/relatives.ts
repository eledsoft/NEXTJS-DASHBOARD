import 'server-only';

import { cache } from 'react';
import { redirect } from 'next/navigation';
import { sql } from '@/app/lib/db';
import { auth } from '@/auth';
import { Relative } from '../lib/definitions';
import { cacheLife, cacheTag } from 'next/cache';

// ── Session verification (React.cache = deduplica per-request. means: same page...) ──

export const verifySession = cache(async () => {
    const session = await auth();

    if (!session?.user?.id) {
        redirect('/login');
    }

    return { isAuth: true, userId: session.user.id, user: session.user };
});

// ── Relatives: use cache (cross-navigation server cache. Means: different page) ──

async function fetchRelatives(userId: string): Promise<Relative[]> {
    'use cache';
    cacheLife({ revalidate: 600 });
    cacheTag(`relatives-${userId}`);

    console.log(`[DB HIT] getRelatives for userId: ${userId}`);
    const data = await sql<Relative[]>`
        SELECT id, name, lastname, age, relationship, related_to, created_at
        FROM relatives
        WHERE related_to = ${userId}
        ORDER BY
            CASE relationship
                WHEN 'padre' THEN 1
                WHEN 'madre' THEN 2
                WHEN 'fratello' THEN 3
                WHEN 'sorella' THEN 4
                WHEN 'figlio' THEN 5
                WHEN 'figlia' THEN 6
                ELSE 7
            END,
            age DESC
    `;
    return data;
}

export async function getRelatives(): Promise<Relative[]> {
    const session = await verifySession();
    if (!session?.user?.id) return [];
    return fetchRelatives(session.user.id);
}

// ── Single relative by ID ──

async function fetchRelativeById(relativeId: string): Promise<Relative | null> {
    'use cache';
    cacheLife({ revalidate: 600 });
    cacheTag(`relative-${relativeId}`);

    console.log(`[DB HIT] getRelativeById for relativeId: ${relativeId}`);
    const data = await sql<Relative[]>`
        SELECT * FROM relatives WHERE id = ${relativeId} LIMIT 1
    `;
    return data[0] || null;
}

export async function getRelativeById(relativeId: string): Promise<Relative | null> {
    const session = await verifySession();
    if (!session) return null;
    return fetchRelativeById(relativeId);
}

// ── Count ──

async function fetchRelativesCount(userId: string): Promise<number> {
    'use cache';
    cacheLife({ revalidate: 600 });
    cacheTag(`relatives-${userId}`);

    console.log(`[DB HIT] getRelativesCount for userId: ${userId}`);
    const data = await sql`
        SELECT COUNT(*)::int as count FROM relatives WHERE related_to = ${userId}
    `;
    return Number(data[0].count);
}

export async function getRelativesCount(): Promise<number> {
    const session = await verifySession();
    if (!session) return 0;
    return fetchRelativesCount(session.userId);
}

// ── Stats ──

async function fetchRelativesStats(userId: string) {
    'use cache';
    cacheLife({ revalidate: 600 });
    cacheTag(`relatives-${userId}`);

    console.log(`[DB HIT] getRelativesStats for userId: ${userId}`);
    const data = await sql`
        SELECT
            relationship,
            COUNT(*)::int as count
        FROM relatives
        WHERE related_to = ${userId}
        GROUP BY relationship
        ORDER BY count DESC
    `;
    return data;
}

export async function getRelativesStats() {
    const session = await verifySession();
    if (!session) return [];
    return fetchRelativesStats(session.userId);
}
