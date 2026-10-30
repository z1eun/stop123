import React from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Shield, ShieldCheck } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface StartScreenProps {
  onStart: () => void;
  onOpenEducatorGuide: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onStart,
  onOpenEducatorGuide,
  isMuted,
  onToggleMute,
}) => {
  const handleStart = () => {
    soundManager.playSuccessChime();
    soundManager.speak('친구야! 유치원에 가야 하는데, 횡단보도를 안전하게 건너야 해. 나를 도와줄래?');
    onStart();
  };

  return (
    <div className="relative w-full min-h-[580px] sm:min-h-[640px] flex flex-col items-center justify-between p-5 sm:p-7 bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-50 rounded-3xl border-4 border-amber-200/90 shadow-xl overflow-hidden select-none">
      {/* Top Bar with Brand & Sound toggles */}
      <div className="w-full flex items-center justify-between z-10">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-amber-200 shadow-xs">
          <Shield className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-bold text-amber-900">어린이 교통안전 체험관</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Educator Guide button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenEducatorGuide();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-900 border border-stone-200 text-xs font-bold shadow-xs pressable-btn cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">선생님·부모님 가이드</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            aria-label={isMuted ? '음소거 해제' : '음소거'}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-stone-700 border border-stone-200 shadow-xs pressable-btn cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>
        </div>
      </div>

      {/* Main Title Hero Area */}
      <div className="flex flex-col items-center text-center my-auto z-10 max-w-2xl w-full px-2">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-400 text-amber-950 font-black text-xs sm:text-sm shadow-xs mb-2 animate-soft-pulse">
          <span>🚦</span>
          <span>유아 교통안전 시뮬레이션 게임</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-800 tracking-tight leading-tight mb-1 drop-shadow-xs">
          안전하게 건너요!
        </h1>

        <p className="text-xl sm:text-2xl font-extrabold text-amber-700 tracking-wide flex items-center justify-center gap-2 mb-1">
          <span>멈춘다!</span>
          <span className="text-amber-400">●</span>
          <span>살핀다!</span>
          <span className="text-amber-400">●</span>
          <span>건넌다!</span>
        </p>

        {/* 🚦 교통안전 3원칙 규칙 카드 (도입 화면 안내) */}
        <div className="w-full my-4 p-4 sm:p-5 rounded-3xl bg-white/95 border-2 border-amber-300 shadow-md">
          <div className="flex items-center justify-center gap-1.5 mb-3 text-xs sm:text-sm font-black text-amber-800">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>건너기 전 꼭 기억해요! 교통안전 3원칙</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-left">
            {/* 1. 멈춘다 */}
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex sm:flex-col items-center sm:items-start gap-2.5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 font-black text-xl flex items-center justify-center shrink-0 shadow-xs">
                ✋
              </div>
              <div>
                <span className="text-xs sm:text-sm font-black text-amber-900 block">1. 멈춘다!</span>
                <p className="text-[11px] font-bold text-slate-600 leading-snug mt-0.5">
                  횡단보도 앞 노란 안전선에 딱 멈춰 서요
                </p>
              </div>
            </div>

            {/* 2. 살핀다 */}
            <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200 flex sm:flex-col items-center sm:items-start gap-2.5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-sky-400 text-sky-950 font-black text-xl flex items-center justify-center shrink-0 shadow-xs">
                👀
              </div>
              <div>
                <span className="text-xs sm:text-sm font-black text-sky-900 block">2. 살핀다!</span>
                <p className="text-[11px] font-bold text-slate-600 leading-snug mt-0.5">
                  차가 멈췄는지 왼쪽, 오른쪽을 살펴요
                </p>
              </div>
            </div>

            {/* 3. 건넌다 */}
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex sm:flex-col items-center sm:items-start gap-2.5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-400 text-emerald-950 font-black text-xl flex items-center justify-center shrink-0 shadow-xs">
                🚶
              </div>
              <div>
                <span className="text-xs sm:text-sm font-black text-emerald-900 block">3. 건넌다!</span>
                <p className="text-[11px] font-bold text-slate-600 leading-snug mt-0.5">
                  파란불에 손을 번쩍 들고 안전하게 건너요
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Big Bouncy '시작하기' Button */}
        <button
          onClick={handleStart}
          className="w-full sm:w-80 py-4.5 px-8 rounded-3xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-black text-2xl sm:text-3xl shadow-xl border-b-6 border-amber-700 pressable-btn flex items-center justify-center gap-4 animate-soft-pulse cursor-pointer mt-1"
        >
          <Sparkles className="w-7 h-7 text-yellow-200 animate-spin" style={{ animationDuration: '4s' }} />
          <span>시작하기!</span>
          <span className="text-2xl">➔</span>
        </button>
      </div>

      {/* Bottom Features pill */}
      <div className="w-full flex items-center justify-center gap-4 text-xs font-bold text-slate-500 select-none z-10 pt-2 border-t border-amber-200/60">
        <span>⭐ 횡단보도 안전 체험</span>
        <span>·</span>
        <span>🔊 한국어 음성 안내</span>
        <span>·</span>
        <span>🏆 맞춤 이름 임명장 수여</span>
      </div>
    </div>
  );
};
