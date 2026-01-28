'use client';

import Link from 'next/link';

export type NavKey = 'presentation' | 'theory' | 'regions' | 'library' | 'game' | 'ai-usage' | 'about';

const navLinks: { key: NavKey; label: string; href: string }[] = [
  { key: 'presentation', label: '🏠 Trang chủ', href: '/' },
  { key: 'regions', label: '🗺️ Ba miền', href: '/regions' },
  // { key: 'game', label: '🎮 Game', href: '/game' },
  { key: 'ai-usage', label: '🤖 AI Usage', href: '/ai-usage' },
  // { key: 'about', label: '👥 About us', href: '/about' }
];

type Props = {
  current: NavKey;
  onNavigate: (key: NavKey) => void;
};

export function NavBar({ current, onNavigate }: Props) {
  return (
    <header className="header">
      {/* Tết decorative top border */}
      <div className="header-tet-border"></div>
      
      {/* Flying horse animation */}
      <div className="flying-horse">
        <svg viewBox="0 0 80 60" className="horse-svg">
          <defs>
            <linearGradient id="horseBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5DEB3"/>
              <stop offset="30%" stopColor="#DEB887"/>
              <stop offset="70%" stopColor="#D2B48C"/>
              <stop offset="100%" stopColor="#C4A574"/>
            </linearGradient>
            <linearGradient id="horseShade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E8D4A8"/>
              <stop offset="100%" stopColor="#B8956C"/>
            </linearGradient>
            <linearGradient id="horseMane" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A3728"/>
              <stop offset="50%" stopColor="#6B4423"/>
              <stop offset="100%" stopColor="#3D2914"/>
            </linearGradient>
            <linearGradient id="horseHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.4)"/>
              <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
            </linearGradient>
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="innerShadow">
              <feOffset dx="0" dy="1"/>
              <feGaussianBlur stdDeviation="1" result="shadow"/>
              <feComposite in="SourceGraphic" in2="shadow" operator="over"/>
            </filter>
          </defs>
          
          {/* Back legs */}
          <g className="horse-leg-back">
            <path d="M22 38 Q20 44 18 50 Q17 53 19 54 L21 54 Q23 53 22 50 Q24 44 25 38" 
                  fill="url(#horseShade)" filter="url(#softGlow)"/>
            <ellipse cx="20" cy="54" rx="2.5" ry="1.5" fill="#3D2914"/>
          </g>
          <g className="horse-leg-back-2">
            <path d="M28 38 Q30 44 32 50 Q33 53 31 54 L29 54 Q27 53 28 50 Q26 44 25 38" 
                  fill="url(#horseShade)" filter="url(#softGlow)"/>
            <ellipse cx="30" cy="54" rx="2.5" ry="1.5" fill="#3D2914"/>
          </g>
          
          {/* Tail */}
          <path d="M12 28 Q6 26 4 30 Q2 34 5 36 Q3 38 6 40 Q4 43 8 44 Q6 46 10 46" 
                stroke="url(#horseMane)" strokeWidth="3" fill="none" strokeLinecap="round"
                className="horse-tail"/>
          
          {/* Body - smooth curves */}
          <path d="M18 28 
                   Q12 28 14 35 
                   Q15 42 22 42 
                   L48 42 
                   Q55 42 56 35 
                   Q58 28 52 26
                   Q48 24 42 24
                   L28 24
                   Q22 24 18 28 Z" 
                fill="url(#horseBody)" filter="url(#softGlow)"/>
          
          {/* Body highlight */}
          <path d="M20 28 Q16 30 18 34 Q20 32 30 30 Q40 28 48 30 Q52 28 50 26 Q42 25 30 25 Q24 25 20 28 Z" 
                fill="url(#horseHighlight)"/>
          
          {/* Body shadow underneath */}
          <ellipse cx="35" cy="41" rx="15" ry="3" fill="rgba(0,0,0,0.1)"/>
          
          {/* Chest */}
          <path d="M48 30 Q54 28 56 24 Q57 20 54 18" 
                fill="url(#horseBody)" stroke="url(#horseBody)" strokeWidth="6" strokeLinecap="round"/>
          
          {/* Front legs */}
          <g className="horse-leg-front">
            <path d="M48 38 Q46 44 44 50 Q43 53 45 54 L47 54 Q49 53 48 50 Q50 44 51 38" 
                  fill="url(#horseShade)" filter="url(#softGlow)"/>
            <ellipse cx="46" cy="54" rx="2.5" ry="1.5" fill="#3D2914"/>
          </g>
          <g className="horse-leg-front-2">
            <path d="M54 36 Q56 42 58 48 Q59 51 57 52 L55 52 Q53 51 54 48 Q52 42 51 36" 
                  fill="url(#horseShade)" filter="url(#softGlow)"/>
            <ellipse cx="56" cy="52" rx="2.5" ry="1.5" fill="#3D2914"/>
          </g>
          
          {/* Neck - elegant curve */}
          <path d="M52 26 Q58 22 60 16 Q62 10 58 8 Q54 6 52 10 Q50 16 50 22 Q50 26 52 26 Z" 
                fill="url(#horseBody)" filter="url(#softGlow)"/>
          
          {/* Neck highlight */}
          <path d="M54 24 Q58 20 59 14 Q60 10 58 9 Q56 8 55 12 Q54 16 54 20 Z" 
                fill="url(#horseHighlight)"/>
          
          {/* Head */}
          <ellipse cx="62" cy="12" rx="9" ry="7" fill="url(#horseBody)" filter="url(#softGlow)"/>
          
          {/* Head highlight */}
          <ellipse cx="60" cy="10" rx="5" ry="3" fill="url(#horseHighlight)"/>
          
          {/* Snout/Muzzle */}
          <ellipse cx="70" cy="14" rx="5" ry="4" fill="url(#horseShade)"/>
          <ellipse cx="70" cy="13" rx="3" ry="2" fill="url(#horseHighlight)"/>
          
          {/* Nostrils */}
          <ellipse cx="73" cy="15" rx="1" ry="0.8" fill="#3D2914"/>
          <ellipse cx="73" cy="13" rx="0.8" ry="0.6" fill="#3D2914"/>
          
          {/* Eye */}
          <ellipse cx="60" cy="10" rx="2.5" ry="2" fill="#1a1a1a"/>
          <ellipse cx="59.5" cy="9.5" rx="1" ry="0.8" fill="#fff"/>
          <circle cx="60.5" cy="10.5" r="0.3" fill="#fff" opacity="0.5"/>
          
          {/* Ear */}
          <path d="M54 4 Q56 -1 58 2 Q60 5 58 8 Q56 6 54 4 Z" fill="url(#horseBody)"/>
          <path d="M55 4 Q56 1 57 3 Q58 5 57 7" fill="url(#horseHighlight)"/>
          
          {/* Mane - flowing */}
          <path d="M54 8 Q48 4 50 12 Q46 6 48 16 Q44 10 46 20 Q42 14 44 24 Q40 20 42 28" 
                stroke="url(#horseMane)" strokeWidth="4" fill="none" strokeLinecap="round"
                className="horse-mane"/>
          <path d="M56 6 Q52 2 54 10 Q50 4 52 14" 
                stroke="url(#horseMane)" strokeWidth="3" fill="none" strokeLinecap="round"
                className="horse-mane"/>
        </svg>
        <span className="horse-sparkles">✨</span>
        <span className="horse-sparkles horse-sparkles-2">⭐</span>
      </div>
      
      {/* Mai flowers falling */}
      <div className="mai-flowers">
        <span>🌸</span>
        <span>🌼</span>
        <span>🌸</span>
        <span>🌼</span>
        <span>🌸</span>
        <span>🌼</span>
        <span>🌸</span>
        <span>🌼</span>
        <span>🌸</span>
        <span>🌼</span>
      </div>
      
      <nav className="nav">
        <div className="brand">
          <div className="brand-logo">
            <span className="brand-icon">🐎</span>
            <span className="brand-year">2026</span>
          </div>
          <div className="brand-text">
            <strong>Tư tưởng Hồ Chí Minh</strong>
            <span className="brand-subtitle">🧧 Chúc Mừng Năm Mới - Bính Ngọ 🧧</span>
          </div>
        </div>
        
        <div className="links">
          {navLinks.map(link => (
            <Link
              key={link.key}
              href={link.href}
              className={`nav-link ${current === link.key ? 'active' : ''}`}
            >
              <span className="nav-link-text">{link.label}</span>
              {current === link.key && <span className="nav-link-indicator"></span>}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
