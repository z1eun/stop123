import React from 'react';
import { Character, CharacterAction } from '../types';
import { CharacterSvg } from './CharacterSvg';
import { TrafficLightSvg, TrafficLightState } from './TrafficLightSvg';
import { CarSvg } from './CarSvg';

interface CrosswalkEnvironmentProps {
  character: Character;
  characterAction: CharacterAction;
  characterProgress: number; // 0 (at yellow line) to 100 (across at opposite sidewalk)
  trafficLightState: TrafficLightState;
  carPosition: number; // percentage from right edge
  isCarStopped: boolean;
  isCarMoving: boolean;
  isLookingLeft: boolean;
  isLookingRight: boolean;
}

export const CrosswalkEnvironment: React.FC<CrosswalkEnvironmentProps> = ({
  character,
  characterAction,
  characterProgress,
  trafficLightState,
  carPosition,
  isCarStopped,
  isCarMoving,
  isLookingLeft,
  isLookingRight,
}) => {
  return (
    <div className="relative w-full h-[420px] sm:h-[460px] md:h-[490px] rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-300 select-none bg-[#93C5FD]">
      {/* 1. SKY & CLOUDS (Reference image style) */}
      <div className="absolute top-0 left-0 right-0 h-[140px] sm:h-[150px] bg-gradient-to-b from-[#BAE6FD] to-[#E0F2FE] z-0">
        {/* Soft cartoon clouds */}
        <div className="absolute top-4 left-8 opacity-90 animate-gentle-float">
          <svg width="70" height="32" viewBox="0 0 100 45" fill="#FFFFFF">
            <path d="M 20 35 Q 10 35 10 25 Q 10 15 25 15 Q 30 5 45 8 Q 60 5 70 15 Q 85 15 85 28 Q 85 35 70 35 Z" />
          </svg>
        </div>
        <div className="absolute top-8 left-40 opacity-80 animate-gentle-float" style={{ animationDelay: '1.5s' }}>
          <svg width="50" height="24" viewBox="0 0 100 45" fill="#FFFFFF">
            <path d="M 20 35 Q 10 35 10 25 Q 10 15 25 15 Q 30 5 45 8 Q 60 5 70 15 Q 85 15 85 28 Q 85 35 70 35 Z" />
          </svg>
        </div>
        <div className="absolute top-5 right-20 opacity-90 animate-gentle-float" style={{ animationDelay: '0.8s' }}>
          <svg width="65" height="30" viewBox="0 0 100 45" fill="#FFFFFF">
            <path d="M 20 35 Q 10 35 10 25 Q 10 15 25 15 Q 30 5 45 8 Q 60 5 70 15 Q 85 15 85 28 Q 85 35 70 35 Z" />
          </svg>
        </div>
      </div>

      {/* 2. GREEN ROLLING BUSHES & TREES IN BACKGROUND (Exact match to reference image) */}
      <div className="absolute top-[85px] sm:top-[95px] left-0 right-0 h-[55px] z-10 overflow-hidden pointer-events-none">
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-full">
          {/* Back dark green layer */}
          <path
            d="M 0 60 Q 60 20 140 40 Q 220 15 320 45 Q 420 10 520 40 Q 640 18 760 45 Q 880 12 1000 40 Q 1100 20 1200 50 L 1200 80 L 0 80 Z"
            fill="#4D7C0F"
          />
          {/* Front lighter green layer */}
          <path
            d="M 0 70 Q 80 35 180 55 Q 300 25 400 55 Q 500 28 620 60 Q 740 25 860 55 Q 980 30 1100 58 L 1200 65 L 1200 80 L 0 80 Z"
            fill="#65A30D"
          />
        </svg>
      </div>

      {/* 3. OPPOSITE SIDEWALK (건너편 보도 - 유치원) */}
      <div className="absolute top-[135px] sm:top-[145px] left-0 right-0 h-[48px] sm:h-[54px] bg-[#E2E8F0] border-b-[6px] border-[#64748B] z-10 flex items-center justify-between px-6">
        <div className="flex items-center gap-2.5">
          <span className="text-3xl sm:text-4xl filter drop-shadow-xs animate-bounce" style={{ animationDuration: '3s' }}>
            🏫
          </span>
          <span className="text-base sm:text-lg font-black text-slate-800 bg-white/95 px-3 py-0.5 rounded-xl border-2 border-amber-300 shadow-xs">
            유치원
          </span>
        </div>
      </div>

      {/* 4. PEDESTRIAN TRAFFIC LIGHT (보행자 신호등 - Attached reference image placement) */}
      {/* Tall grey pole planted on the opposite sidewalk, rising into the sky */}
      <div className="absolute right-[36%] sm:right-[38%] top-[18px] sm:top-[24px] z-30 pointer-events-none flex flex-col items-center">
        <TrafficLightSvg state={trafficLightState} size="sm" showLabel={true} />
        {/* Pole running down to the sidewalk */}
        <div className="w-2.5 h-[50px] sm:h-[56px] bg-[#475569] shadow-sm"></div>
        {/* Pole base mount */}
        <div className="w-6 h-2.5 bg-[#334155] rounded-t-sm"></div>
      </div>

      {/* 5. ROAD SURFACE (아스팔트 차도) */}
      <div className="absolute top-[183px] sm:top-[199px] bottom-[100px] sm:bottom-[110px] left-0 right-0 bg-[#292D39] z-10 overflow-hidden shadow-inner">
        {/* ROAD CENTER DASHED LINE (to the right of crosswalk) */}
        <div className="absolute top-1/2 left-[58%] right-0 -translate-y-1/2 flex items-center">
          <div className="w-full border-b-2 border-dashed border-amber-300 opacity-60"></div>
        </div>

        {/* ============================================================== */}
        {/* 6. HORIZONTAL ZEBRA CROSSWALK STRIPES (User requirement 3)   */}
        {/* "위에서 아래로가 아니라 첨부한 이미지 느낌으로 가로로 서있어야 할 것 같고" */}
        {/* 4 horizontal white trapezoidal stripes stacked vertically with perspective! */}
        {/* ============================================================== */}
        <div className="absolute left-[10%] sm:left-[14%] w-[46%] sm:w-[42%] top-0 bottom-0 flex flex-col justify-evenly py-2 z-10 pointer-events-none">
          {/* Stripe 1 (Furthest / Top): narrower horizontal bar */}
          <div className="w-[82%] mx-auto h-[18px] sm:h-[22px] bg-white shadow-md rounded-xs border-y border-slate-200"></div>

          {/* Stripe 2 (Upper middle): slightly wider */}
          <div className="w-[88%] mx-auto h-[19px] sm:h-[23px] bg-white shadow-md rounded-xs border-y border-slate-200"></div>

          {/* Stripe 3 (Lower middle): wider */}
          <div className="w-[94%] mx-auto h-[20px] sm:h-[24px] bg-white shadow-md rounded-xs border-y border-slate-200"></div>

          {/* Stripe 4 (Closest / Bottom): widest horizontal bar */}
          <div className="w-[100%] mx-auto h-[22px] sm:h-[26px] bg-white shadow-md rounded-xs border-y border-slate-200"></div>
        </div>

        {/* ============================================================== */}
        {/* 7. WHITE STOP LINE (User requirement 4)                       */}
        {/* "자동차가 횡단보도 위에 멈추면 안되고 저기 흰색 정지선에 멈추게 해야지..." */}
        {/* Positioned clearly to the RIGHT of the crosswalk at left-[58%] (right-[42%]) */}
        {/* ============================================================== */}
        <div className="absolute left-[58%] sm:left-[57%] top-0 bottom-0 w-3.5 bg-white shadow-md flex items-center justify-center z-20">
          <span className="text-[9px] font-black text-slate-900 -rotate-90 tracking-wider whitespace-nowrap bg-white/90 px-1 py-0.5 rounded">
            정지선
          </span>
        </div>

        {/* CAR DRIVING & STOPPING CLEARLY BEHIND THE STOP LINE */}
        {/* 
            The stop line is at left: 58% (which is right: 42%).
            The car approaches from the far right (carPosition starts at 2%).
            When stopped, carPosition is set so the front of the car is at right: 40%,
            strictly behind the stop line at right: 42%, NEVER touching the crosswalk!
        */}
        <div
          className="absolute bottom-2 z-20 transition-all duration-700 ease-out"
          style={{
            right: `${carPosition}%`,
            transition: isCarMoving
              ? 'right 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
              : 'right 0.3s ease',
          }}
        >
          <CarSvg
            type="sedan"
            color="#38BDF8"
            isMoving={isCarMoving}
            isStopped={isCarStopped}
            facing="left"
          />
        </div>
      </div>

      {/* 8. NEAR SIDEWALK & PROMINENT YELLOW SAFETY LINE (출발 보도 & 노란 안전선) */}
      <div className="absolute bottom-0 left-0 right-0 h-[100px] sm:h-[110px] bg-[#E2E8F0] border-t-[6px] border-[#94A3B8] z-20">
        {/* BRIGHT YELLOW SAFETY LINE (노란 안전선) */}
        {/* Positioned right along the curb edge where toddlers wait */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-amber-400 border-b-2 border-amber-600 shadow-md flex items-center justify-center z-10">
          <div className="flex items-center gap-2 text-amber-950 font-black text-[10px] sm:text-xs tracking-wider">
            <span>⚠️ 노란 안전선</span>
            <span>──</span>
            <span>차도에서 1~2걸음 뒤 노란 안전선 안에서 멈춰 기다려요!</span>
            <span>──</span>
            <span>⚠️</span>
          </div>
        </div>

        {/* YELLOW FOOTPRINTS (노란 발자국 - 횡단보도 정중앙 앞 대기 위치) */}
        <div className="absolute left-[24%] sm:left-[26%] top-5 z-20 flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-amber-400 border-2 border-amber-500 shadow-md flex items-center gap-2">
            <span className="text-lg">👣</span>
            <div className="flex flex-col">
              <span className="text-[11px] font-black text-slate-900 leading-tight">
                노란 발자국 (대기 위치)
              </span>
              <span className="text-[9px] font-extrabold text-amber-950 leading-none">
                여기 멈춰 서서 좌우를 살펴요
              </span>
            </div>
          </div>
        </div>

        {/* Safe sidewalk indicator label */}
        <div className="absolute right-6 bottom-3 text-right hidden sm:block">
          <span className="text-xs font-black text-slate-600">
            보행자 안전 대기 공간
          </span>
          <p className="text-[10px] font-bold text-slate-500">
            차가 멈추고 파란불이 켜지면 손을 들고 건너요
          </p>
        </div>
      </div>

      {/* 9. CHARACTER SPRITE WALKING ACROSS THE HORIZONTAL CROSSWALK */}
      {/* 
          Progress 0%: on the yellow footprints at bottom (bottom: 20px)
          Progress 100%: safely on opposite sidewalk at top (bottom: 260px)
          Horizontal position: centered in the horizontal zebra stripes (left: 28%)
      */}
      <div
        className="absolute z-30 transition-all duration-700 ease-in-out"
        style={{
          left: '28%',
          bottom: `${20 + (characterProgress / 100) * 240}px`,
        }}
      >
        <CharacterSvg
          character={character}
          action={characterAction}
          size="md"
          isRaisedHand={characterAction === 'crossing'}
        />

        {/* Looking Direction Badge */}
        {characterAction === 'look_left' && (
          <div className="absolute -top-7 -left-14 bg-white px-2.5 py-1 rounded-full text-xs font-black text-sky-700 border-2 border-sky-400 shadow-lg animate-bounce flex items-center gap-1 whitespace-nowrap">
            <span>⬅️</span>
            <span>왼쪽 살피는 중!</span>
          </div>
        )}
        {characterAction === 'look_right' && (
          <div className="absolute -top-7 -right-14 bg-white px-2.5 py-1 rounded-full text-xs font-black text-sky-700 border-2 border-sky-400 shadow-lg animate-bounce flex items-center gap-1 whitespace-nowrap">
            <span>오른쪽 살피는 중!</span>
            <span>➡️</span>
          </div>
        )}
      </div>

      {/* 10. TOP CHECKMARKS FOR LEFT & RIGHT INSPECTION */}
      <div className="absolute top-3 left-4 z-20 flex items-center gap-2">
        <div
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black border transition-colors shadow-xs ${
            isLookingLeft
              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
              : 'bg-white/90 text-slate-400 border-slate-200'
          }`}
        >
          <span>{isLookingLeft ? '✅' : '👀'}</span>
          <span>왼쪽 확인</span>
        </div>
        <div
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black border transition-colors shadow-xs ${
            isLookingRight
              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
              : 'bg-white/90 text-slate-400 border-slate-200'
          }`}
        >
          <span>{isLookingRight ? '✅' : '👀'}</span>
          <span>오른쪽 확인</span>
        </div>
      </div>
    </div>
  );
};
