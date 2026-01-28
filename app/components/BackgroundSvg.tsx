'use client';

export function BackgroundSvg() {
  return (
    <div className="background-svg">
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#667eea', stopOpacity: 0.1 }} />
            <stop offset="100%" style={{ stopColor: '#764ba2', stopOpacity: 0.1 }} />
          </linearGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        {/* Background gradient */}
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Animated circles */}
        <circle cx="10%" cy="20%" r="100" fill="rgba(102, 126, 234, 0.05)">
          <animate
            attributeName="r"
            values="100;120;100"
            dur="8s"
            repeatCount="indefinite"
          />
        </circle>

        <circle cx="90%" cy="80%" r="150" fill="rgba(118, 75, 162, 0.05)">
          <animate
            attributeName="r"
            values="150;180;150"
            dur="10s"
            repeatCount="indefinite"
          />
        </circle>

        <circle cx="50%" cy="50%" r="200" fill="rgba(102, 126, 234, 0.03)">
          <animate
            attributeName="r"
            values="200;250;200"
            dur="12s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Floating lines */}
        <path
          d="M 0,100 Q 250,150 500,100 T 1000,100"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
          fill="none"
        >
          <animate
            attributeName="d"
            values="M 0,100 Q 250,150 500,100 T 1000,100;
                    M 0,100 Q 250,50 500,100 T 1000,100;
                    M 0,100 Q 250,150 500,100 T 1000,100"
            dur="15s"
            repeatCount="indefinite"
          />
        </path>

        <path
          d="M 0,300 Q 250,250 500,300 T 1000,300"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="2"
          fill="none"
        >
          <animate
            attributeName="d"
            values="M 0,300 Q 250,250 500,300 T 1000,300;
                    M 0,300 Q 250,350 500,300 T 1000,300;
                    M 0,300 Q 250,250 500,300 T 1000,300"
            dur="18s"
            repeatCount="indefinite"
          />
        </path>

        {/* Decorative dots */}
        <circle cx="20%" cy="40%" r="3" fill="rgba(255,255,255,0.3)">
          <animate
            attributeName="opacity"
            values="0.3;0.7;0.3"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>

        <circle cx="80%" cy="30%" r="4" fill="rgba(255,255,255,0.3)">
          <animate
            attributeName="opacity"
            values="0.3;0.8;0.3"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>

        <circle cx="60%" cy="70%" r="3" fill="rgba(255,255,255,0.3)">
          <animate
            attributeName="opacity"
            values="0.3;0.6;0.3"
            dur="5s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}
