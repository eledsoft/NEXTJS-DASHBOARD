'use client';

import { useActionState, useOptimistic, useTransition } from 'react';
import { Relative } from '@/app/lib/definitions';
import { addRelative, deleteRelative, RelativeState } from '@/app/lib/relativies';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';

interface Props {
  initialRelatives: Relative[];
  userId: string;
}

export default function FamilyTreeClient({ initialRelatives, userId }: Props) {
  const { t } = useTranslation();

  const relationships = [
    { value: 'padre', label: t('relatives.father') },
    { value: 'madre', label: t('relatives.mother') },
    { value: 'fratello', label: t('relatives.brother') },
    { value: 'sorella', label: t('relatives.sister') },
    { value: 'figlio', label: t('relatives.son') },
    { value: 'figlia', label: t('relatives.daughter') },
    { value: 'nonno', label: t('relatives.grandfather') },
    { value: 'nonna', label: t('relatives.grandmother') },
    { value: 'zio', label: t('relatives.uncle') },
    { value: 'zia', label: t('relatives.aunt') },
    { value: 'cugino', label: t('relatives.cousinM') },
    { value: 'cugina', label: t('relatives.cousinF') },
  ];
  const [optimisticRelatives, addOptimisticRelative] = useOptimistic(
    initialRelatives,
    (state: Relative[], newRelative: Relative) => [...state, newRelative],
  );

  const [deleteIsPending, startDeleteTransition] = useTransition();

  const [state, formAction, isPending] = useActionState(
    async (_prevState: RelativeState, formData: FormData) => {
      const tempRelative: Relative = {
        id: crypto.randomUUID(),
        name: formData.get('name') as string,
        lastname: formData.get('lastname') as string,
        age: parseInt(formData.get('age') as string),
        relationship: formData.get('relationship') as string,
        related_to: userId,
      };

      addOptimisticRelative(tempRelative);
      return addRelative(_prevState, formData);
    },
    { errors: {}, message: null } as RelativeState,
  );

  function handleDelete(relativeId: string) {
    startDeleteTransition(async () => {
      await deleteRelative(relativeId);
    });
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Lista parenti */}
      <Grid container spacing={2}>
        {optimisticRelatives.map((person) => (
          <Grid key={person.id} size={{ xs: 12, md: 6, lg: 4 }}>
            <Card variant="outlined" sx={{ '&:hover': { boxShadow: 3, borderColor: 'primary.light' }, transition: 'all 0.2s' }}>
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {person.name} {person.lastname}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {person.relationship} &bull; {person.age} {t('relatives.years')}
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => handleDelete(person.id)}
                  disabled={deleteIsPending}
                  color="error"
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Form aggiunta */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {t('relatives.addRelative')}
          </Typography>

          {state?.message && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {state.message}
            </Alert>
          )}

          <form action={formAction}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  name="name"
                  label={t('relatives.firstName')}
                  required
                  fullWidth
                  error={!!state?.errors?.name}
                  helperText={state?.errors?.name?.[0]}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  name="lastname"
                  label={t('relatives.lastName')}
                  required
                  fullWidth
                  error={!!state?.errors?.lastname}
                  helperText={state?.errors?.lastname?.[0]}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  name="age"
                  label={t('relatives.age')}
                  type="number"
                  required
                  fullWidth
                  slotProps={{ htmlInput: { min: 0, max: 120 } }}
                  error={!!state?.errors?.age}
                  helperText={state?.errors?.age?.[0]}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  name="relationship"
                  label={t('relatives.relationship')}
                  select
                  required
                  fullWidth
                  defaultValue=""
                  error={!!state?.errors?.relationship}
                  helperText={state?.errors?.relationship?.[0]}
                >
                  {relationships.map((r) => (
                    <MenuItem key={r.value} value={r.value}>
                      {r.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isPending}
              sx={{ mt: 2 }}
            >
              {isPending ? t('relatives.adding') : t('relatives.addButton')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
