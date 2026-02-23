'use client';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MuiButton from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AlternateEmail from '@mui/icons-material/AlternateEmail';
import VpnKey from '@mui/icons-material/VpnKey';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actionsMui';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function LoginForm() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <Box component="form" action={formAction} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Paper elevation={0} sx={{ flex: 1, bgcolor: 'grey.50', px: 3, pb: 2, pt: 4, borderRadius: 2 }}>
        <Typography
          variant="h5"
          sx={{ mb: 1.5, fontFamily: 'var(--font-lusitana), serif' }}
        >
          {t('login.title')}
        </Typography>
        <Box sx={{ width: '100%' }}>
          <TextField
            id="email"
            type="email"
            name="email"
            label={t('common.email')}
            placeholder={t('login.emailPlaceholder')}
            required
            fullWidth
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmail sx={{ fontSize: 18, color: 'grey.500' }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ mb: 2, mt: 2.5 }}
          />
          <TextField
            id="password"
            type="password"
            name="password"
            label={t('common.password')}
            placeholder={t('login.passwordPlaceholder')}
            required
            fullWidth
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKey sx={{ fontSize: 18, color: 'grey.500' }} />
                  </InputAdornment>
                ),
              },
              htmlInput: {
                minLength: 6,
              },
            }}
            sx={{ mb: 2 }}
          />
        </Box>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <MuiButton
          type="submit"
          variant="contained"
          fullWidth
          disabled={isPending}
          endIcon={<ArrowForward />}
          sx={{ mt: 2, textTransform: 'none', height: 40 }}
        >
          {t('login.submit')}
        </MuiButton>
        <Box
          sx={{ display: 'flex', height: 32, alignItems: 'flex-end', gap: 0.5 }}
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ErrorOutline sx={{ fontSize: 20, color: 'error.main' }} />
              <Typography variant="body2" color="error">
                {errorMessage}
              </Typography>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
