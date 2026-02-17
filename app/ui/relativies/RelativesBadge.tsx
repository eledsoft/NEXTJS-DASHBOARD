'use client';

import { useState } from 'react';
import { useRelatives } from '@/app/ui/providers/RelativesProvider';

export default function RelativesBadge() {
    const { relatives } = useRelatives();
    const [open, setOpen] = useState(false);

    // Raggruppa per tipo di relazione
    const byRelationship = relatives.reduce<Record<string, number>>((acc, r) => {
        acc[r.relationship] = (acc[r.relationship] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-md bg-indigo-100 px-3 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 transition-colors"
            >
                👨‍👩‍👧‍👦 {relatives.length} parenti
                <span className="text-xs">{open ? '▲' : '▼'}</span>
            </button>

            {open && (
                <div className="absolute top-full left-0 z-10 mt-1 w-64 rounded-md border bg-white p-3 shadow-lg">
                    <h4 className="mb-2 text-sm font-semibold text-gray-700">I tuoi parenti</h4>

                    {/* Riepilogo per relazione */}
                    <div className="mb-3 flex flex-wrap gap-1">
                        {Object.entries(byRelationship).map(([rel, count]) => (
                            <span
                                key={rel}
                                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                            >
                                {rel}: {count}
                            </span>
                        ))}
                    </div>

                    {/* Lista nomi */}
                    <ul className="max-h-40 overflow-y-auto space-y-1">
                        {relatives.map((r) => (
                            <li key={r.id} className="flex items-center justify-between text-sm">
                                <span>{r.name} {r.lastname}</span>
                                <span className="text-xs text-gray-400">{r.relationship}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
