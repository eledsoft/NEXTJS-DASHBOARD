'use client';

import Chip from '@mui/material/Chip';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Schedule from '@mui/icons-material/Schedule';
import { useTranslation } from 'react-i18next';

export default function InvoiceStatus({ status }: { status: string }) {
  const { t } = useTranslation();

  if (status === 'paid') {
    return (
      <Chip
        icon={<CheckCircle />}
        label={t('common.paid')}
        color="success"
        size="small"
        sx={{ fontWeight: 500 }}
      />
    );
  }

  return (
    <Chip
      icon={<Schedule />}
      label={t('common.pending')}
      size="small"
      sx={{
        bgcolor: 'grey.100',
        color: 'grey.600',
        fontWeight: 500,
        '& .MuiChip-icon': { color: 'grey.500' },
      }}
    />
  );
}
