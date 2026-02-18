import SideNav from '@/app/ui/dashboard/sidenav';
import { getRelatives } from '../dal/relatives';
import { RelativesProvider } from '../ui/providers/RelativesProvider';
import { Suspense } from 'react';
import DashboardShell from '../ui/dashboard/DashboardShell';

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
    <DashboardShell
      sidebar={
        <Suspense fallback={<div style={{ width: '100%' }} />}>
          <SideNav />
        </Suspense>
      }
    >
      <Suspense fallback={null}>
        <RelativesLoader>
          {children}
        </RelativesLoader>
      </Suspense>
    </DashboardShell>
  );
}
