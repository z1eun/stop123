import React from 'react';

export type CarType = 'sedan' | 'bus' | 'compact';

interface CarSvgProps {
  type?: CarType;
  color?: string;
  isMoving?: boolean;
  isStopped?: boolean;
  facing?: 'left' | 'right';
  className?: string;
}

export const CarSvg: React.FC<CarSvgProps> = ({
  type = 'sedan',
  color = '#38BDF8',
  isMoving = true,
  isStopped = false,
  facing = 'left',
  className = '',
}) => {
  // If moving, apply subtle chassis rumble
  const motionClass = isMoving && !isStopped ? 'animate-car-rumble' : '';

  return (
    <div
      className={`relative inline-block select-none ${motionClass} ${className}`}
      style={{
        transform: facing === 'right' ? 'scaleX(-1)' : undefined,
      }}
    >
      {type === 'bus' ? (
        // Cute Yellow Kindergarten Bus (어린이 통학버스)
        <svg
          viewBox="0 0 240 120"
          className="w-48 sm:w-60 md:w-72 h-auto drop-shadow-md overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ground shadow */}
          <ellipse cx="120" cy="114" rx="105" ry="6" fill="#1E293B" opacity="0.25" />

          {/* Bus Body */}
          <rect x="20" y="24" width="200" height="74" rx="16" fill="#FBBF24" stroke="#D97706" strokeWidth="3" />
          <path d="M 20 54 L 220 54" stroke="#EA580C" strokeWidth="4" />

          {/* Yellow School Zone Roof Lights (어린이 보호 경광등) */}
          <circle cx="45" cy="22" r="5" fill="#EF4444" className={isMoving ? "animate-pulse" : ""} />
          <circle cx="65" cy="22" r="5" fill="#F59E0B" className={isMoving ? "animate-pulse" : ""} />
          <circle cx="175" cy="22" r="5" fill="#F59E0B" className={isMoving ? "animate-pulse" : ""} />
          <circle cx="195" cy="22" r="5" fill="#EF4444" className={isMoving ? "animate-pulse" : ""} />

          {/* Front Windshield with Friendly Driver */}
          <path
            d="M 28 32 L 68 32 L 68 54 L 26 54 Z"
            fill="#E0F2FE"
            stroke="#0284C7"
            strokeWidth="2"
          />
          {/* Friendly Bear/Teacher Driver Silhouette waving */}
          <circle cx="48" cy="42" r="7" fill="#64748B" />
          <path d="M 40 54 Q 48 48 56 54 Z" fill="#64748B" />
          <path d="M 54 44 Q 60 38 64 42" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />

          {/* Passenger Windows with silhouettes */}
          <rect x="76" y="32" width="30" height="22" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
          <circle cx="91" cy="42" r="5" fill="#94A3B8" />

          <rect x="114" y="32" width="30" height="22" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
          <circle cx="129" cy="42" r="5" fill="#94A3B8" />

          <rect x="152" y="32" width="30" height="22" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
          <circle cx="167" cy="42" r="5" fill="#94A3B8" />

          {/* School Bus Sign Text */}
          <rect x="76" y="62" width="100" height="18" rx="4" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" />
          <text x="126" y="75" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#B45309">
            어린이 보호 차량
          </text>

          {/* Headlight & Taillight */}
          <circle cx="24" cy="74" r="6" fill="#FEF08A" stroke="#EAB308" strokeWidth="1.5" />
          {isMoving && !isStopped && (
            <path d="M 20 74 L 2 64 L 2 84 Z" fill="#FEF08A" opacity="0.3" />
          )}
          <rect x="214" y="68" width="6" height="12" rx="2" fill="#EF4444" />

          {/* Wheels */}
          {/* Front Wheel */}
          <g transform="translate(60, 96)">
            <circle cx="0" cy="0" r="16" fill="#1E293B" />
            <circle cx="0" cy="0" r="9" fill="#94A3B8" stroke="#CBD5E1" strokeWidth="2" />
            <circle cx="0" cy="0" r="3" fill="#0F172A" />
            {isMoving && !isStopped && (
              <line x1="-7" y1="0" x2="7" y2="0" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" className="animate-spin" />
            )}
          </g>

          {/* Back Wheel */}
          <g transform="translate(180, 96)">
            <circle cx="0" cy="0" r="16" fill="#1E293B" />
            <circle cx="0" cy="0" r="9" fill="#94A3B8" stroke="#CBD5E1" strokeWidth="2" />
            <circle cx="0" cy="0" r="3" fill="#0F172A" />
            {isMoving && !isStopped && (
              <line x1="-7" y1="0" x2="7" y2="0" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" className="animate-spin" />
            )}
          </g>
        </svg>
      ) : (
        // Cute Pastel Sedan / Family Car
        <svg
          viewBox="0 0 190 100"
          className="w-40 sm:w-52 md:w-64 h-auto drop-shadow-md overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ground shadow */}
          <ellipse cx="95" cy="94" rx="80" ry="5" fill="#1E293B" opacity="0.25" />

          {/* Car Body */}
          {/* Upper Cabin */}
          <path
            d="M 40 48 Q 58 18 90 18 L 126 18 Q 146 22 156 48 Z"
            fill={color}
            stroke="#000000"
            strokeWidth="2.5"
            strokeOpacity="0.15"
          />

          {/* Lower chassis */}
          <rect
            x="16"
            y="44"
            width="158"
            height="38"
            rx="12"
            fill={color}
            stroke="#000000"
            strokeWidth="2.5"
            strokeOpacity="0.15"
          />

          {/* Windshield & Windows */}
          <path
            d="M 45 44 L 62 24 L 92 24 L 92 44 Z"
            fill="#E0F2FE"
            stroke="#38BDF8"
            strokeWidth="2"
          />
          {/* Rear Window */}
          <path
            d="M 98 44 L 98 24 L 124 24 L 148 44 Z"
            fill="#E0F2FE"
            stroke="#38BDF8"
            strokeWidth="2"
          />

          {/* Cute Driver in front window */}
          <circle cx="76" cy="34" r="5.5" fill="#475569" />
          <path d="M 70 44 Q 76 39 82 44 Z" fill="#475569" />
          {/* Friendly wave if stopped safely */}
          {isStopped && (
            <path d="M 66 38 Q 62 30 66 26" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
          )}

          {/* Cute smiley headlights on front bumper */}
          <circle cx="20" cy="56" r="6" fill="#FEF08A" stroke="#EAB308" strokeWidth="1.5" />
          {isMoving && !isStopped && (
            <path d="M 16 56 L 0 48 L 0 64 Z" fill="#FEF08A" opacity="0.4" />
          )}
          {/* Taillight */}
          <rect x="168" y="52" width="6" height="10" rx="2" fill="#EF4444" />

          {/* Door Handle */}
          <rect x="88" y="52" width="8" height="3" rx="1.5" fill="#FFFFFF" opacity="0.7" />

          {/* Front Wheel */}
          <g transform="translate(48, 80)">
            <circle cx="0" cy="0" r="14" fill="#1E293B" />
            <circle cx="0" cy="0" r="8" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="2.5" fill="#0F172A" />
            {isMoving && !isStopped && (
              <line x1="-6" y1="0" x2="6" y2="0" stroke="#64748B" strokeWidth="2" className="animate-spin" />
            )}
          </g>

          {/* Back Wheel */}
          <g transform="translate(138, 80)">
            <circle cx="0" cy="0" r="14" fill="#1E293B" />
            <circle cx="0" cy="0" r="8" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="2.5" fill="#0F172A" />
            {isMoving && !isStopped && (
              <line x1="-6" y1="0" x2="6" y2="0" stroke="#64748B" strokeWidth="2" className="animate-spin" />
            )}
          </g>

          {/* Safe Stop Badge when car is stopped */}
          {isStopped && (
            <g transform="translate(86, -4)">
              <rect x="-24" y="0" width="48" height="16" rx="8" fill="#10B981" />
              <text x="0" y="11" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#FFFFFF">
                정지 완료
              </text>
            </g>
          )}
        </svg>
      )}
    </div>
  );
};
