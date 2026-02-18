'use client';

import { Button as MuiButton } from '@mui/material';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <MuiButton
      variant="contained"
      sx={{
        height: 40,
        textTransform: 'none',
        fontSize: '0.875rem',
        fontWeight: 500,
        '&:active': {
          bgcolor: 'primary.dark',
        },
        '&[aria-disabled="true"]': {
          cursor: 'not-allowed',
          opacity: 0.5,
        },
      }}
      {...(rest as any)}
    >
      {children}
    </MuiButton>
  );
}
