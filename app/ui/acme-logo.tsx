'use client';

import Public from '@mui/icons-material/Public';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function AcmeLogo() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        lineHeight: 1,
        color: 'inherit',
      }}
    >
      <Public sx={{ width: 48, height: 48, transform: 'rotate(15deg)' }} />
      <Typography
        sx={{
          fontSize: 44,
          fontFamily: 'var(--font-lusitana), serif',
          color: 'inherit',
        }}
      >
        Acme
      </Typography>
    </Box>
  );
}
