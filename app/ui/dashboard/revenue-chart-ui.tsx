'use client';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CalendarToday from '@mui/icons-material/CalendarToday';
import { Revenue } from '@/app/lib/definitions';

export default function RevenueChartUI({
  revenue,
  chartHeight,
  yAxisLabels,
  topLabel,
}: {
  revenue: Revenue[];
  chartHeight: number;
  yAxisLabels: string[];
  topLabel: number;
}) {
  return (
    <Box sx={{ width: '100%', gridColumn: { md: 'span 4' } }}>
      <Typography
        variant="h6"
        sx={{ mb: 2, fontFamily: 'var(--font-lusitana), serif', fontSize: { xs: '1.25rem', md: '1.5rem' } }}
      >
        Recent Revenue
      </Typography>

      <Paper elevation={0} sx={{ borderRadius: 3, bgcolor: 'grey.50', p: 2 }}>
        <Box
          sx={{
            mt: 0,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(12, 1fr)', sm: 'repeat(13, 1fr)' },
            alignItems: 'flex-end',
            gap: { xs: 1, md: 2 },
            borderRadius: 2,
            bgcolor: 'white',
            p: 2,
          }}
        >
          <Box
            sx={{
              mb: 3,
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              justifyContent: 'space-between',
              fontSize: '0.875rem',
              color: 'grey.400',
              height: chartHeight,
            }}
          >
            {yAxisLabels.map((label) => (
              <Typography key={label} variant="body2" color="text.secondary">
                {label}
              </Typography>
            ))}
          </Box>

          {revenue.map((month) => (
            <Box key={month.month} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: '100%',
                  borderRadius: 1,
                  bgcolor: 'primary.light',
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: 'grey.400',
                  transform: { xs: 'rotate(-90deg)', sm: 'none' },
                }}
              >
                {month.month}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', pb: 1, pt: 3 }}>
          <CalendarToday sx={{ fontSize: 20, color: 'grey.500' }} />
          <Typography variant="body2" sx={{ ml: 1, color: 'grey.500' }}>
            Last 12 months
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
