'use client';

import Box from '@mui/material/Box';

export default function DashboardShell({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: { xs: 'column', md: 'row' }, overflow: 'hidden' }}>
      <Box sx={{ width: { xs: '100%', md: 256 }, flexShrink: 0 }}>
        {sidebar}
      </Box>
      <Box sx={{ flexGrow: 1, p: { xs: 3, md: 6 }, overflowY: 'auto' }}>
        {children}
      </Box>
    </Box>
  );
}
