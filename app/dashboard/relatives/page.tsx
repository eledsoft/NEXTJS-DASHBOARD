import { getRelatives, verifySession } from '@/app/dal/relatives';
import { getRelativesTest } from '@/app/dal/testData';
import FamilyTreeClient from '@/app/ui/relativies/FamilyTreeClient';

export default async function FamilyPage() {
  const { userId } = await verifySession();

  const relatives = await getRelatives();
   const relativesTE = getRelativesTest();

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 32 }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: 24 }}>La mia famiglia</h1>

      {/* PARTE SERVER */}
      <div style={{ background: 'linear-gradient(to right, #eff6ff, #eef2ff)', padding: 24, borderRadius: 8, marginBottom: 32 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 8 }}>Panoramica</h2>
        <p>SERVER : {relativesTE}</p>
        <p style={{ color: '#374151' }}>
          Hai <span style={{ fontWeight: 'bold', color: '#4f46e5' }}>{relatives.length}</span> parenti registrati
        </p>
      </div>

      {/* PARTE CLIENT (interattiva) */}
      <FamilyTreeClient
        initialRelatives={relatives}
        userId={userId}
      />
    </div>
  );
}
