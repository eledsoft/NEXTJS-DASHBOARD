'use client';

import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import NextLink from 'next/link';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <MuiBreadcrumbs
      aria-label="Breadcrumb"
      separator="/"
      sx={{
        mb: 3,
        '& .MuiBreadcrumbs-ol': {
          fontFamily: 'var(--font-lusitana), serif',
          fontSize: { xs: '1.25rem', md: '1.5rem' },
        },
      }}
    >
      {breadcrumbs.map((breadcrumb) =>
        breadcrumb.active ? (
          <Typography
            key={breadcrumb.href}
            sx={{
              color: 'grey.900',
              fontSize: 'inherit',
              fontFamily: 'inherit',
            }}
          >
            {breadcrumb.label}
          </Typography>
        ) : (
          <MuiLink
            key={breadcrumb.href}
            component={NextLink}
            href={breadcrumb.href}
            underline="hover"
            sx={{
              color: 'grey.500',
              fontSize: 'inherit',
              fontFamily: 'inherit',
            }}
          >
            {breadcrumb.label}
          </MuiLink>
        ),
      )}
    </MuiBreadcrumbs>
  );
}
