'use client';

import AcmeLogo from '@/app/ui/acme-logo';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiButton from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import MuiLink from '@mui/material/Link';
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  return (
    <Box component="main" sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column', p: 3 }}>
      <Box sx={{ display: 'flex', height: { xs: 80, md: 208 }, flexShrink: 0, alignItems: 'flex-end', borderRadius: 2, bgcolor: 'primary.main', p: 2 }}>
        <AcmeLogo />
      </Box>
      <Box sx={{ mt: 2, display: 'flex', flexGrow: 1, flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 3,
            borderRadius: 2,
            bgcolor: 'grey.50',
            px: { xs: 3, md: 10 },
            py: 5,
            width: { md: '40%' },
          }}
        >
          <Typography
            sx={{
              fontFamily: 'var(--font-lusitana), serif',
              fontSize: { xs: '1.25rem', md: '1.875rem' },
              lineHeight: { md: 1.5 },
              color: 'grey.800',
            }}
          >
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                width: 0,
                height: 0,
                borderBottom: '30px solid black',
                borderLeft: '20px solid transparent',
                borderRight: '20px solid transparent',
              }}
            />
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <MuiLink href="https://nextjs.org/learn/" sx={{ color: 'primary.main' }}>
              Next.js Learn Course e
            </MuiLink>
            , brought to you by Vercel.
          </Typography>

          <MuiButton
            component={Link}
            href="/login"
            variant="contained"
            endIcon={<ArrowForward />}
            sx={{
              alignSelf: 'flex-start',
              textTransform: 'none',
              fontSize: { xs: '0.875rem', md: '1rem' },
              px: 3,
              py: 1.5,
              gap: 2.5,
            }}
          >
            Log in
          </MuiButton>
        </Paper>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3, width: { md: '60%' }, px: { md: 14 }, py: { md: 6 } }}>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Image
              src="/hero-desktop.png"
              width={1000}
              height={760}
              alt="Screenshots of the dashboard project showing desktop version"
            />
          </Box>
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <Image
              src="/hero-mobile.png"
              width={1000}
              height={760}
              alt="Mobile Screenshots of the dashboard project showing mobile version"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
