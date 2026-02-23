'use client';

import Add from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import MuiButton from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import { deleteInvoice } from '@/app/lib/actions';
import { useTranslation } from 'react-i18next';

export function CreateInvoice() {
  const { t } = useTranslation();
  return (
    <MuiButton
      component={Link}
      href="/dashboard/invoices/create"
      variant="contained"
      endIcon={<Add />}
      sx={{
        textTransform: 'none',
        fontSize: '0.875rem',
        fontWeight: 500,
        height: 40,
      }}
    >
      {t('invoices.createInvoice')}
    </MuiButton>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <IconButton
      component={Link}
      href={`/dashboard/invoices/${id}/edit`}
      size="small"
      sx={{
        border: '1px solid',
        borderColor: 'grey.300',
        borderRadius: 1,
        '&:hover': { bgcolor: 'grey.100' },
      }}
    >
      <Edit sx={{ fontSize: 20 }} />
    </IconButton>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);

  return (
    <form action={deleteInvoiceWithId}>
      <IconButton
        type="submit"
        size="small"
        sx={{
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: 1,
          '&:hover': { bgcolor: 'grey.100' },
        }}
      >
        <Delete sx={{ fontSize: 20 }} />
      </IconButton>
    </form>
  );
}
