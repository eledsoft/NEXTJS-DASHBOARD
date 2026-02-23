import { inter, lusitana } from './ui/fonts';
import { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
// import ThemeRegistry from './ui/providers/ThemeRegistry';
import { Roboto } from 'next/font/google';
import ThemeToggleProvider from './ui/providers/ThemeToggleProvider';
import I18nProvider from './i18n/I18nProvider';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: {
    template: '%s | FIAT Dashboard',
    default: 'FIAT Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lusitana.variable}`}>
      <body>
        <AppRouterCacheProvider>
          <ThemeToggleProvider>
            <I18nProvider>
              {children}
            </I18nProvider>
          </ThemeToggleProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
