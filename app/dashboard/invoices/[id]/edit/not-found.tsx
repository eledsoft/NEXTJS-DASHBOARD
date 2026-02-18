'use client';

import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiButton from '@mui/material/Button';
import SentimentDissatisfied from '@mui/icons-material/SentimentDissatisfied';

export default function NotFound() {
  return (
    <Box component="main" sx={{ display: 'flex', height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
      <SentimentDissatisfied sx={{ fontSize: 40, color: 'grey.400' }} />
      <Typography variant="h6" fontWeight={600}>404 Not Found</Typography>
      <Typography>Could not find the requested invoice.</Typography>
      <MuiButton
        component={Link}
        href="/dashboard/invoices"
        variant="contained"
        sx={{ mt: 2, textTransform: 'none' }}
      >
        Go Back
      </MuiButton>
    </Box>
  );
}
