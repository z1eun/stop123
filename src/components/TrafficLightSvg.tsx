import React from 'react';

export type TrafficLightState = 'YELLOW' | 'RED' | 'GREEN' | 'BLINKING_GREEN';

interface TrafficLightSvgProps {
  state: TrafficLightState;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const TrafficLightSvg: React.FC<TrafficLightSvgProps> = ({
  state,
  size = 'md',
  showLabel = true,
}) => {
  const isYellow = state === 'YELLOW';
  const isRed = state === 'RED';
  const isGreen = state === 'GREEN' || state === 'BLINKING_GREEN';

  const sizeClasses = {
    sm: 'w-16',
    md: 'w-24',
    lg: 'w-32',
  };

  return (
    <div className={`flex flex-col items-center select-none ${sizeClasses[size]}`}>
      {/* Light housing SVG - 3 aspect: Red (top), Yellow (middle), Green (bottom) */}
      <svg
        viewBox="0 0 100 240"
        className="w-full h-auto drop-shadow-md overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Visor top */}
        <path d="M 15 18 Q 50 8 85 18 L 80 22 Q 50 14 20 22 Z" fill="#1E293B" />
        {/* Main box */}
        <rect
          x="12"
          y="15"
          width="76"
          height="210"
          rx="18"
          fill="#1E293B"
          stroke="#334155"
          strokeWidth="3"
        />

        {/* Yellow border line for school zone */}
        <rect
          x="15"
          y="18"
          width="70"
          height="204"
          rx="15"
          fill="none"
          stroke="#FBBF24"
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />

        {/* 1. TOP SIGNAL: RED LIGHT (빨간불 - 멈춤) */}
        <g id="red-light">
          {/* Visor */}
          <path d="M 22 30 Q 50 20 78 30" fill="none" stroke="#0F172A" strokeWidth="4" />
          <circle
            cx="50"
            cy="52"
            r="26"
            fill={isRed ? '#DC2626' : '#2D1B1B'}
            stroke="#0F172A"
            strokeWidth="3"
          />
          {isRed && (
            <circle
              cx="50"
              cy="52"
              r="30"
              fill="none"
              stroke="#EF4444"
              strokeWidth="3"
              opacity="0.8"
              className="animate-pulse"
            />
          )}
          {/* Red standing figure */}
          <g fill={isRed ? '#FFFFFF' : '#450A0A'} opacity={isRed ? 1 : 0.35}>
            <circle cx="50" cy="40" r="5.5" />
            <rect x="45" y="47" width="10" height="13" rx="2.5" />
            <rect x="40.5" y="47" width="3.5" height="11" rx="1.5" />
            <rect x="56" y="47" width="3.5" height="11" rx="1.5" />
            <rect x="45.5" y="61" width="4" height="11" rx="1.5" />
            <rect x="50.5" y="61" width="4" height="11" rx="1.5" />
          </g>
        </g>

        {/* 2. MIDDLE SIGNAL: YELLOW / ORANGE LIGHT (주황불 - 신호 변경 주의!) */}
        <g id="yellow-light">
          {/* Visor */}
          <path d="M 22 96 Q 50 86 78 96" fill="none" stroke="#0F172A" strokeWidth="4" />
          <circle
            cx="50"
            cy="118"
            r="26"
            fill={isYellow ? '#F59E0B' : '#2A2012'}
            stroke="#0F172A"
            strokeWidth="3"
          />
          {isYellow && (
            <circle
              cx="50"
              cy="118"
              r="30"
              fill="none"
              stroke="#FBBF24"
              strokeWidth="3.5"
              opacity="0.9"
              className="animate-pulse"
            />
          )}
          {/* Yellow warning alert hand / exclamation */}
          <g fill={isYellow ? '#FFFFFF' : '#78350F'} opacity={isYellow ? 1 : 0.35}>
            {/* Warning hand palm */}
            <circle cx="50" cy="116" r="10" />
            <path
              d="M 44 116 L 44 107 M 47 116 L 47 104 M 50 116 L 50 103 M 53 116 L 53 105 M 56 116 L 56 109"
              stroke={isYellow ? '#FFFFFF' : '#78350F'}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* 3. BOTTOM SIGNAL: GREEN / BLUE LIGHT (파란불 - 건너요) */}
        <g id="green-light">
          {/* Visor */}
          <path d="M 22 162 Q 50 152 78 162" fill="none" stroke="#0F172A" strokeWidth="4" />
          <circle
            cx="50"
            cy="184"
            r="26"
            fill={isGreen ? '#16A34A' : '#14291B'}
            stroke="#0F172A"
            strokeWidth="3"
          />
          {isGreen && (
            <circle
              cx="50"
              cy="184"
              r="30"
              fill="none"
              stroke="#22C55E"
              strokeWidth="3.5"
              opacity="0.9"
              className={state === 'BLINKING_GREEN' ? 'animate-ping' : 'animate-pulse'}
            />
          )}
          {/* Green walking figure */}
          <g fill={isGreen ? '#FFFFFF' : '#052E16'} opacity={isGreen ? 1 : 0.35}>
            <circle cx="52" cy="172" r="5.5" />
            <path d="M 46 179 L 55 179 L 52 191 L 45 191 Z" />
            <path d="M 46 180 L 40 187" stroke={isGreen ? '#FFFFFF' : '#052E16'} strokeWidth="3" strokeLinecap="round" />
            <path d="M 54 180 L 60 188" stroke={isGreen ? '#FFFFFF' : '#052E16'} strokeWidth="3" strokeLinecap="round" />
            <path d="M 46 191 L 42 203" stroke={isGreen ? '#FFFFFF' : '#052E16'} strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 51 191 L 58 201" stroke={isGreen ? '#FFFFFF' : '#052E16'} strokeWidth="3.5" strokeLinecap="round" />
          </g>
        </g>

        {/* Pole bottom mount */}
        <rect x="45" y="225" width="10" height="15" fill="#64748B" />
      </svg>

      {/* Clear friendly status badge for children */}
      {showLabel && (
        <div className="mt-1 text-center whitespace-nowrap">
          {isYellow && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-800 border-2 border-amber-400 shadow-xs animate-bounce">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
              주황불 (주의!)
            </span>
          )}
          {isRed && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-100 text-rose-700 border-2 border-rose-300 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
              빨간불 (멈춰요!)
            </span>
          )}
          {isGreen && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border-2 border-emerald-400 shadow-xs animate-bounce">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              파란불 (건너요!)
            </span>
          )}
        </div>
      )}
    </div>
  );
};
