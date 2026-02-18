import AccountBalance from '@mui/icons-material/AccountBalance';
import Schedule from '@mui/icons-material/Schedule';
import Inbox from '@mui/icons-material/Inbox';
import Group from '@mui/icons-material/Group';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  collected: AccountBalance,
  customers: Group,
  pending: Schedule,
  invoices: Inbox,
};

export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div style={{ borderRadius: 12, backgroundColor: '#f9fafb', padding: 8, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', padding: 16 }}>
        {Icon ? <Icon style={{ width: 20, height: 20, color: '#374151' }} /> : null}
        <h3 style={{ marginLeft: 8, fontSize: '0.875rem', fontWeight: 500 }}>{title}</h3>
      </div>
      <p
        style={{
          fontFamily: 'var(--font-lusitana), serif',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          borderRadius: 12,
          backgroundColor: 'white',
          padding: '32px 16px',
          textAlign: 'center',
          fontSize: '1.5rem',
        }}
      >
        {value}
      </p>
    </div>
  );
}
