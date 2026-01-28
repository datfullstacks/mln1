'use client';

import Link from 'next/link';

export type NavKey = 'presentation' | 'theory' | 'regions' | 'library' | 'game' | 'ai-usage' | 'about';

const navLinks: { key: NavKey; label: string; href: string }[] = [
  { key: 'presentation', label: '🏠 Trang chủ', href: '/' },
  { key: 'regions', label: '🗺️ Ba miền', href: '/regions' },
  { key: 'game', label: '🎮 Game', href: '/game' },
  { key: 'ai-usage', label: '🤖 AI Usage', href: '/ai-usage' },
  { key: 'about', label: '👥 About us', href: '/about' }
];

type Props = {
  current: NavKey;
  onNavigate: (key: NavKey) => void;
};

export function NavBar({ current, onNavigate }: Props) {

  return (
    <header className="header">
      {/* Santa sleigh flying animation */}
      <div className="santa-sleigh">🦌🦌🛷🎅</div>
      
      <nav className="nav">
        <div className="brand">
          <span>P</span>
          <div>
            <strong>Phenomenon</strong>
          </div>
        </div>
        <div className="links">
          {navLinks.map(link => (
            <Link
              key={link.key}
              href={link.href}
              className={current === link.key ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
      
      {/* Christmas lights */}
      <div className="christmas-lights">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}
