import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ position: 'relative', margin: '0 auto', display: 'flex', width: '100%', maxWidth: 400, flexDirection: 'column', gap: 10, padding: 16 }}>
        <div style={{ display: 'flex', height: 80, width: '100%', alignItems: 'flex-end', borderRadius: 8, backgroundColor: '#0070F3', padding: 12 }}>
          <div style={{ width: 128, color: 'white' }}>
            <AcmeLogo />
          </div>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
