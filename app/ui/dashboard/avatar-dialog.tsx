'use client';

import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTranslation } from 'react-i18next';
import { useThemeToggle } from '@/app/ui/providers/ThemeToggleProvider';

interface AvatarDialogProps {
  userName?: string | null;
  userEmail?: string | null;
}

export default function AvatarDialog({ userName, userEmail }: AvatarDialogProps) {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { themeMode, toggleTheme } = useThemeToggle();

  const initial = userName?.charAt(0)?.toUpperCase() ?? '?';

  return (
    <>
      <Avatar
        variant="square"
        sx={{
          height: '100%',
          width: '100%',
          cursor: 'pointer',
          '&:hover': { opacity: 0.8 },
        }}
        onClick={() => setOpen(true)}
      >
        {initial}
      </Avatar>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
          {t('user.profile')}
          <IconButton size="small" onClick={() => setOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {/* User info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Avatar sx={{ width: 56, height: 56, fontSize: '1.5rem', bgcolor: 'primary.main' }}>
              {initial}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {userName ?? '-'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {userEmail ?? '-'}
              </Typography>
            </Box>
          </Box>

          {/* Language selector */}
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {t('user.language')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            <Chip
              label="Italiano"
              onClick={() => i18n.changeLanguage('it')}
              color={i18n.language === 'it' ? 'primary' : 'default'}
              variant={i18n.language === 'it' ? 'filled' : 'outlined'}
            />
            <Chip
              label="English"
              onClick={() => i18n.changeLanguage('en')}
              color={i18n.language === 'en' ? 'primary' : 'default'}
              variant={i18n.language === 'en' ? 'filled' : 'outlined'}
            />
          </Box>

          {/* Theme selector */}
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {t('user.theme')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              icon={<LightModeIcon />}
              label={t('user.themeLight')}
              onClick={() => themeMode !== 'light' && toggleTheme()}
              color={themeMode === 'light' ? 'primary' : 'default'}
              variant={themeMode === 'light' ? 'filled' : 'outlined'}
            />
            <Chip
              icon={<DarkModeIcon />}
              label={t('user.themeDark')}
              onClick={() => themeMode !== 'dark' && toggleTheme()}
              color={themeMode === 'dark' ? 'primary' : 'default'}
              variant={themeMode === 'dark' ? 'filled' : 'outlined'}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)} variant="outlined" sx={{ textTransform: 'none' }}>
            {t('user.close')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
