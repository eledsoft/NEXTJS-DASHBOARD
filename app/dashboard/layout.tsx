import SideNav from '@/app/ui/dashboard/sidenav';
import { getRelatives } from '../dal/relatives';
import { RelativesProvider } from '../ui/providers/RelativesProvider';
import { Suspense } from 'react';

async function RelativesLoader({ children }: { children: React.ReactNode }) {
  const relatives = await getRelatives();
  return (
    <RelativesProvider initialRelatives={relatives}>
      {children}
    </RelativesProvider>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <Suspense fallback={<div className="w-full flex-none md:w-64" />}>
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
      </Suspense>
      <Suspense fallback={<div className="grow p-6 md:overflow-y-auto md:p-12">Caricamento...</div>}>
        <RelativesLoader>
          <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </RelativesLoader>
      </Suspense>
    </div>
  );
}
