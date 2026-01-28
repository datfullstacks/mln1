'use client';

import { NavBar } from '../components/NavBar';
import { Regions } from '../components/Regions';

export default function RegionsPage() {
  return (
    <>
      <NavBar current="regions" onNavigate={() => {}} />
      <main>
        <Regions />
      </main>
    </>
  );
}
