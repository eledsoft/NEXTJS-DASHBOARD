'use client';

import { createContext, useContext, useState } from 'react';
import { Relative } from '@/app/lib/definitions';

interface RelativesContextType {
    relatives: Relative[];
    setRelatives: (relatives: Relative[]) => void;
}

const RelativesContext = createContext<RelativesContextType>({
    relatives: [],
    setRelatives: () => {},
});

export function RelativesProvider({
    initialRelatives,
    children,
}: {
    initialRelatives: Relative[];
    children: React.ReactNode;
}) {
    const [relatives, setRelatives] = useState(initialRelatives);

    return (
        <RelativesContext.Provider value={{ relatives, setRelatives }}>
            {children}
        </RelativesContext.Provider>
    );
}

export function useRelatives() {
    return useContext(RelativesContext);
}
