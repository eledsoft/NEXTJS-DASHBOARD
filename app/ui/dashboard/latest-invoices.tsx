import { fetchLatestInvoices } from '@/app/lib/data';
import LatestInvoicesUI from './latest-invoices-ui';

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();
  return <LatestInvoicesUI latestInvoices={latestInvoices} />;
}
