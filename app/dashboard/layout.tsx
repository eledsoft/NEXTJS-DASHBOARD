import SideNav from '@/app/ui/dashboard/sidenav';

import {  getRelativesTest } from '../dal/testData';
import {  getRelatives, resetRelativesCache, getRelativesForProvider } from '../dal/relatives';
import { RelativesProvider } from '../ui/providers/RelativesProvider';
import { Suspense } from 'react';
import DashboardShell from '../ui/dashboard/DashboardShell';
import DateDisplay from '../ui/date-display';

async function RelativesLoader({ children }: { children: React.ReactNode }) {
  resetRelativesCache(); // reset cache on each request to see the effect of caching in getRelatives()
  const relatives = await getRelativesForProvider();
  const relativesTE = await getRelativesTest();

  return (
    <RelativesProvider initialRelatives={relatives}>
          <DateDisplay value={relativesTE} label="Data in LAYOUT" />
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
