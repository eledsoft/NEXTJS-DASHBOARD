import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { signOut } from '@/auth';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import { Avatar } from '@mui/material';
  import { auth } from '@/auth';
import { getRelatives, verifySession } from '@/app/dal/relatives';
import Loading from '@/app/dashboard/(overview)/loading';

export default async function SideNav() {
  //add route protection to this component, so
  //user should be redirected based on user roles. (consider if better in auth.config.ts))



// in un Server Component o Server Action
const session = await auth();

session?.user?.name   // "User"
session?.user?.email  // "user@nextmail.com"
session?.user?.image  // undefined nel tuo caso


 // in un Server Component o Server Action
  //const { userId } = await verifySession();
let relatives = [];
  if (session?.user?.id) {
    relatives = await getRelatives( );
  }


  const avatar = null; // Replace with actual avatar component or image source if available
  return (
    <Box
      sx={{
        height: "100%",
        width: "56px",
        background: grey[800],
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        alignItems: "stretch",
      }}
    >
      <Box
        // className={classes.header}
        sx={{
          border: "1px solid transparent",
          borderRadius: "4px 4px 0px 0px",
          aspectRatio: "1",
          overflow: "hidden",
          display: "grid",
          placeItems: "center",
        }}
      >
        {avatar ?? <Avatar variant="square" sx={{ height: "100%", width: "100%" }} >{session?.user?.name?.charAt(0)}</Avatar>}
      </Box>
      <Box sx={{ mb: 1, height: { xs: 80, md: 160 } }}>
        <Link
          href="/"
          style={{
            display: 'flex',
            height: '100%',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            borderRadius: 6,
            backgroundColor: '#2563eb',
            padding: 16,
            textDecoration: 'none',
          }}
        >
          <Box sx={{ width: { xs: 128, md: 160 }, color: 'white' }}>
            <AcmeLogo />
          </Box>
        </Link>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: { xs: 'row', md: 'column' },
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <NavLinks />
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            height: 'auto',
            width: '100%',
            flexGrow: 1,
            borderRadius: 1,
            bgcolor: 'grey.100',
          }}
        />
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <Button
            type="submit"
            sx={{
              height: 48,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', md: 'flex-start' },
              gap: 1,
              borderRadius: 1,
              bgcolor: 'grey.100',
              p: { xs: 1.5, md: 1 },
              px: { md: 1.5 },
              fontSize: '0.875rem',
              fontWeight: 500,
              textTransform: 'none',
              color: 'text.primary',
              '&:hover': {
                bgcolor: '#e0f2fe',
                color: '#2563eb',
              },
            }}
          >
            <PowerSettingsNewIcon sx={{ width: 12, height: 12 }} />
            <Box
              component="span"
              sx={{ display: { xs: 'none', md: 'block' } }}
            >
              {relatives.length}
            </Box>
          </Button>
        </form>
      </Box>
    </Box>
  );
}
