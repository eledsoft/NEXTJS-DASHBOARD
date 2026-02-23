'use client';

import { parseISO } from 'date-fns';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';

export default function DateDisplay({ value, label }: { value: string; label?: string }) {
  return (
    <DateTimeField
    sx={{borderRadius: 1, padding: 1, }}
      label={label}
      value={parseISO(value)}
      readOnly
      size="small"
      slotProps={{
        textField: {
          variant: 'standard',
        },
      }}
    />
  );
}
