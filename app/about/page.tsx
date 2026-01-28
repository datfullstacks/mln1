'use client';

import { NavBar } from '../components/NavBar';
import { AboutUs } from '../components/AboutUs';
import { DongSonBackground } from '../components/DongSonBackground';

export default function AboutPage() {
  return (
    <>
      <NavBar current="about" onNavigate={() => {}} />
      <DongSonBackground />
      <main className="about-shell">
        <AboutUs />
      </main>
    </>
  );
}
