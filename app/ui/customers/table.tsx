'use client';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Image from 'next/image';
import Search from '@/app/ui/search';
import { FormattedCustomersTable } from '@/app/lib/definitions';
import { useTranslation } from 'react-i18next';

export default function CustomersTable({
  customers,
}: {
  customers: FormattedCustomersTable[];
}) {
  const { t } = useTranslation();

  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        variant="h5"
        sx={{ mb: 4, fontFamily: 'var(--font-lusitana), serif', fontSize: { xs: '1.25rem', md: '1.5rem' } }}
      >
        {t('customers.title')}
      </Typography>
      <Search placeholder={t('customers.searchPlaceholder')} />
      <Box sx={{ mt: 3 }}>
        <Paper elevation={0} sx={{ borderRadius: 2, bgcolor: 'grey.50', p: 1, pt: { md: 0 }, overflow: 'hidden' }}>
          {/* Mobile view */}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            {customers?.map((customer) => (
              <Paper key={customer.id} elevation={0} sx={{ mb: 1, width: '100%', p: 2, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid', borderColor: 'grey.200', pb: 2 }}>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                      <Image
                        src={customer.image_url}
                        alt={`${customer.name}'s profile picture`}
                        width={28}
                        height={28}
                        style={{ borderRadius: '50%' }}
                      />
                      <Typography variant="body2">{customer.name}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {customer.email}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', borderBottom: '1px solid', borderColor: 'grey.200', py: 2.5 }}>
                  <Box sx={{ width: '50%' }}>
                    <Typography variant="caption">{t('common.pending')}</Typography>
                    <Typography variant="body2" fontWeight={500}>{customer.total_pending}</Typography>
                  </Box>
                  <Box sx={{ width: '50%' }}>
                    <Typography variant="caption">{t('common.paid')}</Typography>
                    <Typography variant="body2" fontWeight={500}>{customer.total_paid}</Typography>
                  </Box>
                </Box>
                <Box sx={{ pt: 2 }}>
                  <Typography variant="body2">{t('customers.invoicesCount', { count: customer.total_invoices })}</Typography>
                </Box>
              </Paper>
            ))}
          </Box>

          {/* Desktop view */}
          <TableContainer sx={{ display: { xs: 'none', md: 'block' } }}>
            <Table sx={{ minWidth: '100%' }}>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 500, pl: 3 }}>{t('common.name')}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{t('common.email')}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{t('customers.totalInvoices')}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{t('customers.totalPending')}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{t('customers.totalPaid')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ '& td': { bgcolor: 'white' } }}>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell sx={{ pl: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Image
                          src={customer.image_url}
                          alt={`${customer.name}'s profile picture`}
                          width={28}
                          height={28}
                          style={{ borderRadius: '50%' }}
                        />
                        <Typography variant="body2">{customer.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.total_invoices}</TableCell>
                    <TableCell>{customer.total_pending}</TableCell>
                    <TableCell>{customer.total_paid}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
}
