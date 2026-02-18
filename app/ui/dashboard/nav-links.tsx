'use client';

import Home from '@mui/icons-material/Home';
import Description from '@mui/icons-material/Description';
import Group from '@mui/icons-material/Group';
import People from '@mui/icons-material/People';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Invoices', href: '/dashboard/invoices', icon: Description },
  { name: 'Customers', href: '/dashboard/customers', icon: Group },
  { name: 'Relatives', href: '/dashboard/relatives', icon: People },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;
        return (
          <ListItemButton
            key={link.name}
            component={Link}
            href={link.href}
            selected={isActive}
            sx={{
              height: 48,
              gap: 1,
              borderRadius: 1,
              bgcolor: isActive ? '#e0f2fe' : 'grey.50',
              color: isActive ? 'primary.dark' : 'text.primary',
              fontSize: '0.875rem',
              fontWeight: 500,
              justifyContent: { xs: 'center', md: 'flex-start' },
              px: { xs: 1.5, md: 1.5 },
              py: { xs: 1.5, md: 1 },
              flexGrow: { xs: 1, md: 0 },
              '&:hover': {
                bgcolor: '#e0f2fe',
                color: 'primary.dark',
              },
              '&.Mui-selected': {
                bgcolor: '#e0f2fe',
                color: 'primary.dark',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 'auto', color: 'inherit' }}>
              <LinkIcon sx={{ width: 24 }} />
            </ListItemIcon>
            <ListItemText
              primary={link.name}
              sx={{ display: { xs: 'none', md: 'block' } }}
              slotProps={{ primary: { sx: { fontSize: 'inherit', fontWeight: 'inherit' } } }}
            />
          </ListItemButton>
        );
      })}
    </>
  );
}
