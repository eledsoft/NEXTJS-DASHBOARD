'use client';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Refresh from '@mui/icons-material/Refresh';
import Image from 'next/image';
import { LatestInvoice } from '@/app/lib/definitions';
import { useTranslation } from 'react-i18next';

export default function LatestInvoicesUI({
  latestInvoices,
}: {
  latestInvoices: LatestInvoice[];
}) {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', gridColumn: { md: 'span 4' } }}>
      <Typography
        variant="h6"
        sx={{ mb: 2, fontFamily: 'var(--font-lusitana), serif', fontSize: { xs: '1.25rem', md: '1.5rem' } }}
      >
        {t('dashboard.latestInvoices')}
      </Typography>
      <Paper elevation={0} sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column', justifyContent: 'space-between', borderRadius: 3, bgcolor: 'grey.50', p: 2 }}>
        <Box sx={{ bgcolor: 'white', px: 3 }}>
          {latestInvoices.map((invoice, i) => (
            <Box key={invoice.id}>
              {i !== 0 && <Divider />}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Image
                    src={invoice.image_url}
                    alt={`${invoice.name}'s profile picture`}
                    width={32}
                    height={32}
                    style={{ marginRight: 16, borderRadius: '50%' }}
                  />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontSize: { xs: '0.875rem', md: '1rem' },
                      }}
                    >
                      {invoice.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ display: { xs: 'none', sm: 'block' }, color: 'grey.500' }}
                    >
                      {invoice.email}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  sx={{
                    fontFamily: 'var(--font-lusitana), serif',
                    fontWeight: 500,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontSize: { xs: '0.875rem', md: '1rem' },
                  }}
                >
                  {invoice.amount}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', pb: 1, pt: 3 }}>
          <Refresh sx={{ fontSize: 20, color: 'grey.500' }} />
          <Typography variant="body2" sx={{ ml: 1, color: 'grey.500' }}>
            {t('dashboard.updatedJustNow')}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
