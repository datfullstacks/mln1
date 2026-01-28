'use client';

import { NavBar } from '../components/NavBar';
import { Game } from '../components/Game';

export default function GamePage() {
  return (
    <>
      <NavBar current="game" onNavigate={() => {}} />
      <main>
        <Game />
      </main>
    </>
  );
}
