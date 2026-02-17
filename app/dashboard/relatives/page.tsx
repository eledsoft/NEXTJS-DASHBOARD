// app/family/page.tsx

import { getRelatives, verifySession } from '@/app/dal/relatives';
import FamilyTreeClient from '@/app/ui/relativies/FamilyTreeClient';

export default async function FamilyPage() {
  const { userId } = await verifySession();

  // Fetch server-side (cachato via "use cache" — no DB hit se già in cache)
  const relatives = await getRelatives();
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">La mia famiglia</h1>
      
      {/* PARTE SERVER */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-2">Panoramica</h2>
        <p className="text-gray-700">
          Hai <span className="font-bold text-indigo-600">{relatives.length}</span> parenti registrati
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