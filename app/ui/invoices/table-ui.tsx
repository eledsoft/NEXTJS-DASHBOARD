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
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { InvoicesTable as InvoicesTableType } from '@/app/lib/definitions';

export default function InvoicesTableUI({
  invoices,
}: {
  invoices: InvoicesTableType[];
}) {
  return (
    <Box sx={{ mt: 3 }}>
      <Paper elevation={0} sx={{ borderRadius: 2, bgcolor: 'grey.50', p: 1, pt: { md: 0 } }}>
        {/* Mobile view */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          {invoices?.map((invoice) => (
            <Paper key={invoice.id} elevation={0} sx={{ mb: 1, width: '100%', p: 2, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid', borderColor: 'grey.200', pb: 2 }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Image
                      src={invoice.image_url}
                      width={28}
                      height={28}
                      alt={`${invoice.name}'s profile picture`}
                      style={{ marginRight: 8, borderRadius: '50%' }}
                    />
                    <Typography variant="body2">{invoice.name}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {invoice.email}
                  </Typography>
                </Box>
                <InvoiceStatus status={invoice.status} />
              </Box>
              <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', pt: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    {formatCurrency(invoice.amount)}
                  </Typography>
                  <Typography variant="body2">{formatDateToLocal(invoice.date)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                  <UpdateInvoice id={invoice.id} />
                  <DeleteInvoice id={invoice.id} />
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>

        {/* Desktop view */}
        <TableContainer sx={{ display: { xs: 'none', md: 'block' } }}>
          <Table sx={{ minWidth: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 500, pl: 3 }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 500 }} align="right">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ bgcolor: 'white' }}>
              {invoices?.map((invoice) => (
                <TableRow key={invoice.id} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                  <TableCell sx={{ pl: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Image
                        src={invoice.image_url}
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                        style={{ borderRadius: '50%' }}
                      />
                      <Typography variant="body2">{invoice.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{invoice.email}</TableCell>
                  <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                  <TableCell>{formatDateToLocal(invoice.date)}</TableCell>
                  <TableCell><InvoiceStatus status={invoice.status} /></TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
                      <UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
