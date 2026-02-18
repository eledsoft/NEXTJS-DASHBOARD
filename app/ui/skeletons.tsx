'use client';

import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export function CardSkeleton() {
  return (
    <Paper elevation={0} sx={{ borderRadius: 3, bgcolor: 'grey.100', p: 1, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
      <Box sx={{ display: 'flex', p: 2 }}>
        <Skeleton variant="rounded" width={20} height={20} />
        <Skeleton variant="rounded" width={64} height={24} sx={{ ml: 1 }} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 3, bgcolor: 'white', px: 2, py: 4 }}>
        <Skeleton variant="rounded" width={80} height={28} />
      </Box>
    </Paper>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function RevenueChartSkeleton() {
  return (
    <Box sx={{ width: '100%', overflow: 'hidden', gridColumn: { md: 'span 4' } }}>
      <Skeleton variant="rounded" width={144} height={32} sx={{ mb: 2 }} />
      <Paper elevation={0} sx={{ borderRadius: 3, bgcolor: 'grey.100', p: 2 }}>
        <Skeleton variant="rounded" height={410} sx={{ borderRadius: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', pb: 1, pt: 3 }}>
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="rounded" width={80} height={16} sx={{ ml: 1 }} />
        </Box>
      </Paper>
    </Box>
  );
}

export function InvoiceSkeleton() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid', borderColor: 'grey.100', py: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Skeleton variant="circular" width={32} height={32} sx={{ mr: 1 }} />
        <Box>
          <Skeleton variant="rounded" width={160} height={20} />
          <Skeleton variant="rounded" width={48} height={16} sx={{ mt: 1 }} />
        </Box>
      </Box>
      <Skeleton variant="rounded" width={48} height={16} />
    </Box>
  );
}

export function LatestInvoicesSkeleton() {
  return (
    <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', overflow: 'hidden', gridColumn: { md: 'span 4' } }}>
      <Skeleton variant="rounded" width={144} height={32} sx={{ mb: 2 }} />
      <Paper elevation={0} sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column', justifyContent: 'space-between', borderRadius: 3, bgcolor: 'grey.100', p: 2 }}>
        <Box sx={{ bgcolor: 'white', px: 3 }}>
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', pb: 1, pt: 3 }}>
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="rounded" width={80} height={16} sx={{ ml: 1 }} />
        </Box>
      </Paper>
    </Box>
  );
}

export default function DashboardSkeleton() {
  return (
    <>
      <Skeleton variant="rounded" width={144} height={32} sx={{ mb: 2, borderRadius: 2 }} />
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' } }}>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </Box>
      <Box sx={{ mt: 3, display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)', lg: 'repeat(8, 1fr)' }, gap: 3 }}>
        <RevenueChartSkeleton />
        <LatestInvoicesSkeleton />
      </Box>
    </>
  );
}

export function TableRowSkeleton() {
  return (
    <TableRow>
      <TableCell sx={{ py: 1.5, pl: 3, pr: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="rounded" width={96} height={24} />
        </Box>
      </TableCell>
      <TableCell sx={{ px: 1.5, py: 1.5 }}><Skeleton variant="rounded" width={128} height={24} /></TableCell>
      <TableCell sx={{ px: 1.5, py: 1.5 }}><Skeleton variant="rounded" width={64} height={24} /></TableCell>
      <TableCell sx={{ px: 1.5, py: 1.5 }}><Skeleton variant="rounded" width={64} height={24} /></TableCell>
      <TableCell sx={{ px: 1.5, py: 1.5 }}><Skeleton variant="rounded" width={64} height={24} /></TableCell>
      <TableCell sx={{ py: 1.5, pl: 3, pr: 1.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
          <Skeleton variant="rounded" width={38} height={38} />
          <Skeleton variant="rounded" width={38} height={38} />
        </Box>
      </TableCell>
    </TableRow>
  );
}

export function InvoicesMobileSkeleton() {
  return (
    <Paper elevation={0} sx={{ mb: 1, width: '100%', p: 2, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid', borderColor: 'grey.100', pb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Skeleton variant="circular" width={32} height={32} sx={{ mr: 1 }} />
          <Skeleton variant="rounded" width={64} height={24} />
        </Box>
        <Skeleton variant="rounded" width={64} height={24} />
      </Box>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', pt: 2 }}>
        <Box>
          <Skeleton variant="rounded" width={64} height={24} />
          <Skeleton variant="rounded" width={96} height={24} sx={{ mt: 1 }} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Skeleton variant="rounded" width={40} height={40} />
          <Skeleton variant="rounded" width={40} height={40} />
        </Box>
      </Box>
    </Paper>
  );
}

export function InvoicesTableSkeleton() {
  return (
    <Box sx={{ mt: 3 }}>
      <Paper elevation={0} sx={{ borderRadius: 2, bgcolor: 'grey.50', p: 1, pt: { md: 0 } }}>
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <InvoicesMobileSkeleton />
          <InvoicesMobileSkeleton />
          <InvoicesMobileSkeleton />
          <InvoicesMobileSkeleton />
          <InvoicesMobileSkeleton />
          <InvoicesMobileSkeleton />
        </Box>
        <Table sx={{ display: { xs: 'none', md: 'table' }, minWidth: '100%', color: 'grey.900' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 500 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 500 }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 500 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 500 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 500 }} align="right">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ bgcolor: 'white' }}>
            <TableRowSkeleton />
            <TableRowSkeleton />
            <TableRowSkeleton />
            <TableRowSkeleton />
            <TableRowSkeleton />
            <TableRowSkeleton />
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
