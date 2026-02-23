'use client';

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import { createInvoice } from '@/app/lib/actionsMui';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { invoiceFormSchema, type InvoiceFormData } from '@/app/lib/validations';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  Paper,
  Typography,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import {
  CheckCircle,
  Schedule,
  AttachMoney,
  Person,
} from '@mui/icons-material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function CreateInvoiceForm({
  customers,
}: {
  customers: CustomerField[];
}) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      customerId: '',
      amount: 0,
      status: 'pending',
    },
  });

  const onSubmit = async (data: InvoiceFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const formData = new FormData();
      formData.append('customerId', data.customerId);
      formData.append('amount', data.amount.toString());
      formData.append('status', data.status);

      const result = await createInvoice({ message: null, errors: {} }, formData);

      if (result?.message) {
        setServerError(result.message);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
      setServerError('An unexpected error occurred');
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, bgcolor: 'grey.50', borderRadius: 2 }}>
        {/* Customer Name */}
        <FormControl fullWidth error={!!errors.customerId} sx={{ mb: 3 }}>
          <InputLabel id="customer-label">{t('invoices.chooseCustomer')}</InputLabel>
          <Controller
            name="customerId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                labelId="customer-label"
                label={t('invoices.chooseCustomer')}
                startAdornment={
                  <InputAdornment position="start">
                    <Person sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                }
              >
                <MenuItem value="" disabled>
                  {t('invoices.selectCustomer')}
                </MenuItem>
                {customers.map((customer) => (
                  <MenuItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.customerId && (
            <FormHelperText>{errors.customerId.message}</FormHelperText>
          )}
        </FormControl>

        {/* Invoice Amount */}
        <FormControl fullWidth error={!!errors.amount} sx={{ mb: 3 }}>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t('invoices.chooseAmount')}
                type="number"
                inputProps={{
                  step: '0.01',
                  min: '0',
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
                placeholder={t('invoices.enterAmount')}
                error={!!errors.amount}
                helperText={errors.amount?.message}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            )}
          />
        </FormControl>

        {/* Invoice Status */}
        <FormControl component="fieldset" error={!!errors.status} sx={{ width: '100%' }}>
          <Typography variant="body2" fontWeight="medium" sx={{ mb: 1 }}>
            {t('invoices.setStatus')}
          </Typography>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              bgcolor: 'background.paper',
              borderColor: errors.status ? 'error.main' : 'grey.300',
            }}
          >
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field} row>
                  <FormControlLabel
                    value="pending"
                    control={<Radio />}
                    label={
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          bgcolor: 'grey.100',
                          px: 1.5,
                          py: 0.75,
                          borderRadius: 3,
                        }}
                      >
                        <Typography variant="caption" fontWeight="medium" color="text.secondary">
                          {t('common.pending')}
                        </Typography>
                        <Schedule sx={{ fontSize: 16, color: 'text.secondary' }} />
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="paid"
                    control={<Radio />}
                    label={
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          bgcolor: 'success.main',
                          px: 1.5,
                          py: 0.75,
                          borderRadius: 3,
                        }}
                      >
                        <Typography variant="caption" fontWeight="medium" color="white">
                          {t('common.paid')}
                        </Typography>
                        <CheckCircle sx={{ fontSize: 16, color: 'white' }} />
                      </Box>
                    }
                  />
                </RadioGroup>
              )}
            />
            {errors.status && (
              <FormHelperText sx={{ mt: 1 }}>{errors.status.message}</FormHelperText>
            )}
          </Paper>
        </FormControl>

        {/* Server Error */}
        {serverError && (
          <Typography color="error" variant="body2" sx={{ mt: 2 }}>
            {serverError}
          </Typography>
        )}
      </Paper>

      {/* Action Buttons */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          component={Link}
          href="/dashboard/invoices"
          variant="outlined"
          color="inherit"
          sx={{
            bgcolor: 'grey.100',
            color: 'text.secondary',
            '&:hover': {
              bgcolor: 'grey.200',
            },
          }}
        >
          {t('common.cancel')}
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={16} /> : null}
        >
          {isSubmitting ? t('invoices.creating') : t('invoices.createInvoice')}
        </Button>
      </Box>
    </Box>
  );
}
