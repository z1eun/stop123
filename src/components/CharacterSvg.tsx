import React from 'react';
import { Character, CharacterAction } from '../types';

interface CharacterSvgProps {
  character: Character;
  action?: CharacterAction;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  isRaisedHand?: boolean;
}

export const CharacterSvg: React.FC<CharacterSvgProps> = ({
  character,
  action = 'idle',
  size = 'md',
  className = '',
  isRaisedHand = false,
}) => {
  const sizeMap = {
    sm: 'w-16 h-24',
    md: 'w-24 h-36',
    lg: 'w-32 h-48',
    xl: 'w-44 h-64',
    hero: 'w-56 h-80'
  };

  // Determine head rotation angle based on action
  let headRotation = 0;
  let eyeOffsetX = 0;
  let pupilOffsetX = 0;
  if (action === 'look_left') {
    headRotation = -22;
    eyeOffsetX = -3;
    pupilOffsetX = -4;
  } else if (action === 'look_right') {
    headRotation = 22;
    eyeOffsetX = 3;
    pupilOffsetX = 4;
  }

  const isCrossingOrRaised = action === 'crossing' || isRaisedHand;
  const isJumping = action === 'celebrating';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${sizeMap[size]} ${className}`}
      style={{
        transform: isJumping ? 'translateY(-12px)' : undefined,
        transition: 'transform 0.25s ease-out'
      }}
    >
      <svg
        viewBox="0 0 120 180"
        className="w-full h-full overflow-visible drop-shadow-sm"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Soft ground shadow */}
        <ellipse
          cx="60"
          cy="172"
          rx={isJumping ? '22' : '30'}
          ry={isJumping ? '4' : '7'}
          fill="#334155"
          opacity={isJumping ? '0.12' : '0.22'}
          style={{ transition: 'all 0.25s ease' }}
        />

        {/* Legs & Shoes */}
        <g id="legs">
          {/* Left Leg */}
          <rect x="42" y="125" width="12" height="30" rx="6" fill="#1E293B" />
          <ellipse cx="46" cy="158" rx="10" ry="7" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
          <ellipse cx="45" cy="158" rx="6" ry="3" fill="#EF4444" />

          {/* Right Leg */}
          <rect x="66" y="125" width="12" height="30" rx="6" fill="#1E293B" />
          <ellipse cx="74" cy="158" rx="10" ry="7" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
          <ellipse cx="75" cy="158" rx="6" ry="3" fill="#EF4444" />
        </g>

        {/* Backpack behind torso */}
        <rect
          x="32"
          y="78"
          width="56"
          height="42"
          rx="14"
          fill="#0284C7"
          stroke="#0369A1"
          strokeWidth="3"
        />
        <path d="M 40 78 Q 60 70 80 78" stroke="#38BDF8" strokeWidth="3" fill="none" />

        {/* Torso & Shirt */}
        <rect
          x="35"
          y="76"
          width="50"
          height="52"
          rx="16"
          fill={character.shirtHex}
          stroke="#000000"
          strokeWidth="2.5"
          strokeOpacity="0.15"
        />

        {/* Shirt collar / emblem */}
        <path
          d="M 50 76 Q 60 84 70 76"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Cute yellow safety badge / star on chest */}
        <circle cx="60" cy="94" r="6" fill="#FEF08A" stroke="#EAB308" strokeWidth="1.5" />
        <polygon
          points="60,90 61.5,93 65,93 62,95 63,98 60,96 57,98 58,95 55,93 58.5,93"
          fill="#CA8A04"
        />

        {/* Left Arm */}
        <g id="left-arm">
          {action === 'celebrating' ? (
            // Raised arm left
            <path
              d="M 37 84 C 20 68 18 50 24 40"
              stroke={character.shirtHex}
              strokeWidth="13"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            // Natural arm down / slightly curved
            <path
              d="M 36 84 C 28 98 26 108 30 118"
              stroke={character.shirtHex}
              strokeWidth="12"
              strokeLinecap="round"
              fill="none"
            />
          )}
          {/* Left hand */}
          <circle
            cx={action === 'celebrating' ? 24 : 30}
            cy={action === 'celebrating' ? 38 : 120}
            r="6.5"
            fill={character.skinHex}
          />
        </g>

        {/* Right Arm - Raised Hand for Traffic Safety ("손들기!") */}
        <g id="right-arm">
          {isCrossingOrRaised || action === 'celebrating' ? (
            // HIGH RAISED HAND (Traffic Safety Principle for Korean Children)
            <g>
              {/* Arm reaching up high */}
              <path
                d="M 83 84 C 95 66 98 46 95 34"
                stroke={character.shirtHex}
                strokeWidth="13"
                strokeLinecap="round"
                fill="none"
              />
              {/* Hand waving up high */}
              <circle cx="95" cy="30" r="7.5" fill={character.skinHex} />
              {/* Open palm fingers indication */}
              <path
                d="M 91 24 L 91 19 M 94 23 L 95 17 M 98 24 L 100 19 M 88 28 L 84 26"
                stroke={character.skinHex}
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Sparkle badge near raised hand */}
              <circle cx="106" cy="22" r="3" fill="#FBBF24" opacity="0.9" />
            </g>
          ) : (
            // Natural arm down
            <g>
              <path
                d="M 84 84 C 92 98 94 108 90 118"
                stroke={character.shirtHex}
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="90" cy="120" r="6.5" fill={character.skinHex} />
            </g>
          )}
        </g>

        {/* HEAD GROUP (Can rotate left or right) */}
        <g
          id="head"
          style={{
            transformOrigin: '60px 48px',
            transform: `rotate(${headRotation}deg)`,
            transition: 'transform 0.22s ease-in-out'
          }}
        >
          {/* Neck */}
          <rect x="54" y="66" width="12" height="12" rx="4" fill={character.skinHex} />

          {/* Ears */}
          <circle cx="34" cy="48" r="6" fill={character.skinHex} />
          <circle cx="86" cy="48" r="6" fill={character.skinHex} />

          {/* Face Base */}
          <circle
            cx="60"
            cy="48"
            r="26"
            fill={character.skinHex}
            stroke="#000000"
            strokeWidth="1.5"
            strokeOpacity="0.08"
          />

          {/* Cheeks (Blushing pink) */}
          <ellipse cx="44" cy="54" rx="4.5" ry="3" fill="#F472B6" opacity="0.45" />
          <ellipse cx="76" cy="54" rx="4.5" ry="3" fill="#F472B6" opacity="0.45" />

          {/* Eyes */}
          {action === 'celebrating' ? (
            // Happy arched eyes (^^)
            <g stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none">
              <path d="M 45 46 Q 50 40 55 46" />
              <path d="M 65 46 Q 70 40 75 46" />
            </g>
          ) : (
            // Big open curious eyes with eyeOffsetX for looking direction
            <g>
              {/* Left Eye */}
              <ellipse cx={49 + eyeOffsetX} cy="47" rx="4.5" ry="5.5" fill="#1E293B" />
              <circle cx={48 + pupilOffsetX} cy="45" r="1.8" fill="#FFFFFF" />

              {/* Right Eye */}
              <ellipse cx={71 + eyeOffsetX} cy="47" rx="4.5" ry="5.5" fill="#1E293B" />
              <circle cx={70 + pupilOffsetX} cy="45" r="1.8" fill="#FFFFFF" />
            </g>
          )}

          {/* Eyebrows */}
          <path
            d="M 45 39 Q 50 37 55 39"
            stroke="#451A03"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 65 39 Q 70 37 75 39"
            stroke="#451A03"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Cute Nose */}
          <circle cx="60" cy="51" r="1.5" fill="#EA580C" opacity="0.6" />

          {/* Cheerful Smile */}
          <path
            d={action === 'celebrating' || action === 'crossing' ? "M 53 55 Q 60 63 67 55 Z" : "M 54 56 Q 60 61 66 56"}
            fill={action === 'celebrating' || action === 'crossing' ? "#EF4444" : "none"}
            stroke="#991B1B"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Hair Styles */}
          {character.hairStyle === 'short' && (
            // Short bouncy boyish / sporty hair
            <g fill={character.hairHex}>
              <path d="M 34 44 C 32 26 44 20 60 20 C 76 20 88 26 86 44 C 82 30 76 28 60 28 C 44 28 38 32 34 44 Z" />
              <path d="M 40 28 Q 50 36 58 28 Q 66 36 78 28" stroke={character.hairHex} strokeWidth="3" />
            </g>
          )}

          {character.hairStyle === 'pigtails' && (
            // Cute pigtails with ribbons
            <g fill={character.hairHex}>
              {/* Bangs & top */}
              <path d="M 35 44 C 33 26 44 22 60 22 C 76 22 87 26 85 44 C 80 32 74 30 60 30 C 46 30 40 34 35 44 Z" />
              <path d="M 42 32 Q 52 38 60 32 Q 68 38 78 32" stroke={character.hairHex} strokeWidth="3" />
              {/* Left pigtail */}
              <ellipse cx="28" cy="46" rx="7" ry="10" transform="rotate(-20 28 46)" />
              <circle cx="32" cy="40" r="3.5" fill="#F43F5E" />
              {/* Right pigtail */}
              <ellipse cx="92" cy="46" rx="7" ry="10" transform="rotate(20 92 46)" />
              <circle cx="88" cy="40" r="3.5" fill="#F43F5E" />
            </g>
          )}

          {character.hairStyle === 'curly' && (
            // Girl 2: Cute bob haircut with floral hair clip
            <g fill={character.hairHex}>
              {/* Sleek round bob hair */}
              <path d="M 33 46 C 30 25 43 18 60 18 C 77 18 90 25 87 46 C 88 56 86 64 82 68 C 80 50 78 30 60 30 C 42 30 40 50 38 68 C 34 64 32 56 33 46 Z" />
              {/* Cute bangs */}
              <path d="M 40 32 Q 50 36 60 32 Q 70 36 80 32" stroke={character.hairHex} strokeWidth="3" fill="none" />
              {/* Flower / Star Hair Clip on side */}
              <circle cx="76" cy="36" r="4.5" fill="#F43F5E" />
              <circle cx="76" cy="36" r="2" fill="#FEF08A" />
            </g>
          )}

          {character.hairStyle === 'cap' && (
            // Boy 2: Cool sporty sky-blue baseball cap
            <g>
              <ellipse cx="60" cy="30" rx="27" ry="15" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
              <path d="M 33 32 Q 60 25 87 32" stroke="#38BDF8" strokeWidth="2" fill="none" />
              {/* Cap visor facing forward */}
              <path d="M 40 33 Q 60 40 80 33 L 84 37 Q 60 46 36 37 Z" fill="#0369A1" />
              {/* Cap front button / badge */}
              <circle cx="60" cy="20" r="3" fill="#FBBF24" />
            </g>
          )}
        </g>

        {/* Celebrating sparkle stars */}
        {action === 'celebrating' && (
          <g>
            <polygon points="18,18 20,23 25,24 21,27 22,32 18,29 14,32 15,27 11,24 16,23" fill="#FBBF24" />
            <polygon points="102,12 103,16 107,17 104,19 105,23 102,21 99,23 100,19 97,17 101,16" fill="#38BDF8" />
            <polygon points="60,4 62,8 66,9 63,11 64,15 60,13 56,15 57,11 54,9 58,8" fill="#F472B6" />
          </g>
        )}
      </svg>
    </div>
  );
};
