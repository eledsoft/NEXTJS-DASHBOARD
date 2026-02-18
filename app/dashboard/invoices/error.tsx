'use client';

import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiButton from '@mui/material/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Box component="main" sx={{ display: 'flex', height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h6" textAlign="center">Something went wrong!</Typography>
      <MuiButton
        variant="contained"
        onClick={() => reset()}
        sx={{ mt: 2, textTransform: 'none' }}
      >
        Try again
      </MuiButton>
    </Box>
  );
}
