'use client';

import { useState } from 'react';
import { useRelatives } from '@/app/ui/providers/RelativesProvider';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function RelativesBadge() {
    const { relatives } = useRelatives();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const byRelationship = relatives.reduce<Record<string, number>>((acc, r) => {
        acc[r.relationship] = (acc[r.relationship] || 0) + 1;
        return acc;
    }, {});

    const open = Boolean(anchorEl);

    return (
        <>
            <Button
                onClick={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}
                size="small"
                sx={{
                    bgcolor: '#e0e7ff',
                    color: '#4338ca',
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    '&:hover': { bgcolor: '#c7d2fe' },
                }}
            >
                {relatives.length} parenti {open ? '▲' : '▼'}
            </Button>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                slotProps={{ paper: { sx: { width: 256, p: 1.5, mt: 0.5 } } }}
            >
                <Typography variant="subtitle2" sx={{ mb: 1, color: 'grey.700' }}>
                    I tuoi parenti
                </Typography>

                <Box sx={{ mb: 1.5, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {Object.entries(byRelationship).map(([rel, count]) => (
                        <Chip
                            key={rel}
                            label={`${rel}: ${count}`}
                            size="small"
                            sx={{ bgcolor: 'grey.100', color: 'grey.600', fontSize: '0.75rem' }}
                        />
                    ))}
                </Box>

                <List dense sx={{ maxHeight: 160, overflowY: 'auto' }}>
                    {relatives.map((r) => (
                        <ListItem key={r.id} disablePadding sx={{ py: 0.25 }}>
                            <ListItemText
                                primary={`${r.name} ${r.lastname}`}
                                secondary={r.relationship}
                                slotProps={{
                                    primary: { sx: { fontSize: '0.875rem' } },
                                    secondary: { sx: { fontSize: '0.75rem', color: 'grey.400' } },
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Popover>
        </>
    );
}
