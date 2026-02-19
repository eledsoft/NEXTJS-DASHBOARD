import 'server-only';

import { cache } from 'react';
import { redirect } from 'next/navigation';
import { sql } from '@/app/lib/db';
import { auth } from '@/auth';
import { Relative } from '../lib/definitions';
// import { cacheLife, cacheTag } from 'next/cache';

// ── Session verification (React.cache = deduplica per-request. means: same page...) ──
export const verifySession = cache(async () => {
    const session = await auth();

    if (!session?.user?.id) {
        redirect('/login');
    }

    return { isAuth: true, userId: session.user.id, user: session.user };
});


// cache a livello di modulo (per userId)
const relatCache = new Map<string, Relative[]>();
const relatPromiseCache = new Map<string, Promise<Relative[]>>();



async function fetchRelativesFromDB(): Promise<Relative[]> {
    console.log(`[INIT] getRelatives`);
   const session = await verifySession();
    if (!session?.user?.id) return [];
    const data = await sql<Relative[]>`
        SELECT id, name, lastname, age, relationship, related_to, created_at
        FROM relatives
        WHERE related_to = ${session.user.id}
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

export async function getRelativesForProvider(): Promise<Relative[]> {
      const session = await verifySession();
    if (!session?.user?.id) return [];
    return fetchRelativesFromDB()
}

export async function getRelatives(): Promise<Relative[]> {
    const session = await verifySession();
    if (!session?.user?.id) return [];
    const userId = session.user.id;

    console.log(`[FUNCTION] getRelatives for userId: ${userId}`);

    // se già caricati → ritorna subito
    if (relatCache.has(userId)) {
        return relatCache.get(userId)!;
    }

    // se la query è già in corso → evita doppia esecuzione
    if (relatPromiseCache.has(userId)) {
        return relatPromiseCache.get(userId)!;
    }

    // prima volta → esegue query
    const promise = fetchRelativesFromDB()
        .then((data) => {
            relatCache.set(userId, data);
            return data;
        })
        .finally(() => {
            relatPromiseCache.delete(userId);
        });

    relatPromiseCache.set(userId, promise);
    return promise;
}

export function resetRelativesCache(userId?: string) {
    if (userId) {
        console.log(`[CACHE RESET] getRelatives cache reset for userId: ${userId}`);
        relatCache.delete(userId);
        relatPromiseCache.delete(userId);
    } else {
        console.log(`[CACHE RESET] getRelatives cache reset (all)`);
        relatCache.clear();
        relatPromiseCache.clear();
    }
}

// ── Single relative by ID ──

export async function getRelativeById(relativeId: string): Promise<Relative | null> {
    const session = await verifySession();
    if (!session) return null;

    const fetchData = async () => {
        // 'use cache';
        // cacheLife({ revalidate: 600 });
        // cacheTag(`relative-${relativeId}`);

        console.log(`[DB HIT] getRelativeById for relativeId: ${relativeId}`);
        const data = await sql<Relative[]>`
            SELECT * FROM relatives WHERE id = ${relativeId} LIMIT 1
        `;
        return data[0] || null;
    };

    return fetchData();
}

// ── Count ──

export async function getRelativesCount(): Promise<number> {
    const session = await verifySession();
    if (!session) return 0;

    const fetchData = async () => {
        // 'use cache';
        // cacheLife({ revalidate: 600 });
        // cacheTag(`relatives-${session.userId}`);

        console.log(`[DB HIT] getRelativesCount for userId: ${session.userId}`);
        const data = await sql`
            SELECT COUNT(*)::int as count FROM relatives WHERE related_to = ${session.userId}
        `;
        return Number(data[0].count);
    };

    return fetchData();
}

// ── Stats ──

export async function getRelativesStats() {
    const session = await verifySession();
    if (!session) return [];

    const fetchData = async () => {
        // 'use cache';
        // cacheLife({ revalidate: 600 });
        // cacheTag(`relatives-${session.userId}`);

        console.log(`[DB HIT] getRelativesStats for userId: ${session.userId}`);
        const data = await sql`
            SELECT
                relationship,
                COUNT(*)::int as count
            FROM relatives
            WHERE related_to = ${session.userId}
            GROUP BY relationship
            ORDER BY count DESC
        `;
        return data;
    };

    return fetchData();
}
