import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';
import { getRelatives, } from '@/app/dal/relatives';
import { Metadata } from 'next';
import RelativesBadge from '@/app/ui/relativies/RelativesBadge';
import { getRelativesTest } from '@/app/dal/testData';
import DateDisplay from '@/app/ui/date-display';

export const metadata: Metadata = {
  title: 'Invoices',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const [totalPages, relatives] = await Promise.all([
    fetchInvoicesPages(query),
    getRelatives(),
  ]);

  const relativesTE = await getRelativesTest();

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontFamily: 'var(--font-lusitana), serif', fontSize: '1.5rem' }}>Invoices</h1>
      </div>
      <DateDisplay value={relativesTE} label="Data di TEST" />
      {/* SERVER: dato letto via getRelatives() con "use cache" */}
      <div style={{ marginTop: 8, borderRadius: 6, backgroundColor: '#eff6ff', padding: 12, fontSize: '0.875rem', color: '#1d4ed8' }}>
        (Server) Hai <span style={{ fontWeight: 'bold' }}>{relatives.length}</span> parenti registrati
      </div>
      {/* CLIENT: dato letto via useRelatives() dal Context */}
      <div style={{ marginTop: 8 }}>
        <RelativesBadge />
      </div>
      <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div style={{ marginTop: 20, display: 'flex', width: '100%', justifyContent: 'center' }}>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
