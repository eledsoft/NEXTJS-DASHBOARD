import { fetchFilteredInvoices } from '@/app/lib/data';
import InvoicesTableUI from './table-ui';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);
  return <InvoicesTableUI invoices={invoices} />;
}
