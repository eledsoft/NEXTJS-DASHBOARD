import { inter, lusitana } from './ui/fonts';
import { Metadata } from 'next';
import ThemeRegistry from './ui/providers/ThemeRegistry';

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
            <ThemeRegistry>{children}</ThemeRegistry>
        </body>
    </html>
  );
}
