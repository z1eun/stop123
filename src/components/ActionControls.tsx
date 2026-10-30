import React from 'react';
import { soundManager } from '../utils/audio';

interface ActionControlsProps {
  onStop: () => void;
  onLookLeft: () => void;
  onLookRight: () => void;
  onCross: () => void;

  // Active status badges to help visualize progress
  hasStopped?: boolean;
  lookedLeft?: boolean;
  lookedRight?: boolean;
  canCrossReady?: boolean;
}

export const ActionControls: React.FC<ActionControlsProps> = ({
  onStop,
  onLookLeft,
  onLookRight,
  onCross,
  hasStopped = false,
  lookedLeft = false,
  lookedRight = false,
  canCrossReady = false,
}) => {
  const handleClick = (callback: () => void) => {
    soundManager.playClick();
    callback();
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {/* 4 Large Action Buttons (All enabled so children learn by trying and reasoning!) */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 py-1">
        {/* 1. ✋ 멈춘다! */}
        <button
          onClick={() => handleClick(onStop)}
          className={`py-3.5 sm:py-4 px-3 sm:px-4 rounded-2xl font-black text-base sm:text-lg md:text-xl flex items-center justify-center gap-2.5 transition-all shadow-md pressable-btn cursor-pointer ${
            hasStopped
              ? 'bg-amber-400 text-amber-950 border-b-4 border-amber-600 ring-2 ring-amber-300'
              : 'bg-amber-500 hover:bg-amber-600 text-white border-b-4 border-amber-700'
          }`}
        >
          <span className="text-2xl sm:text-3xl">✋</span>
          <span>멈춘다!</span>
          {hasStopped && <span className="text-xs font-black bg-white/90 text-amber-900 px-1.5 py-0.5 rounded-full">완료</span>}
        </button>

        {/* 2. ⬅️ 왼쪽 보기 */}
        <button
          onClick={() => handleClick(onLookLeft)}
          className={`py-3.5 sm:py-4 px-3 sm:px-4 rounded-2xl font-black text-base sm:text-lg md:text-xl flex items-center justify-center gap-2.5 transition-all shadow-md pressable-btn cursor-pointer ${
            lookedLeft
              ? 'bg-sky-400 text-sky-950 border-b-4 border-sky-600 ring-2 ring-sky-300'
              : 'bg-sky-500 hover:bg-sky-600 text-white border-b-4 border-sky-700'
          }`}
        >
          <span className="text-2xl sm:text-3xl">⬅️</span>
          <span>왼쪽 보기</span>
          {lookedLeft && <span className="text-xs font-black bg-white/90 text-sky-900 px-1.5 py-0.5 rounded-full">완료</span>}
        </button>

        {/* 3. ➡️ 오른쪽 보기 */}
        <button
          onClick={() => handleClick(onLookRight)}
          className={`py-3.5 sm:py-4 px-3 sm:px-4 rounded-2xl font-black text-base sm:text-lg md:text-xl flex items-center justify-center gap-2.5 transition-all shadow-md pressable-btn cursor-pointer ${
            lookedRight
              ? 'bg-sky-400 text-sky-950 border-b-4 border-sky-600 ring-2 ring-sky-300'
              : 'bg-sky-500 hover:bg-sky-600 text-white border-b-4 border-sky-700'
          }`}
        >
          <span className="text-2xl sm:text-3xl">➡️</span>
          <span>오른쪽 보기</span>
          {lookedRight && <span className="text-xs font-black bg-white/90 text-sky-900 px-1.5 py-0.5 rounded-full">완료</span>}
        </button>

        {/* 4. 🚶 건넌다! */}
        <button
          onClick={() => handleClick(onCross)}
          className={`py-3.5 sm:py-4 px-3 sm:px-4 rounded-2xl font-black text-base sm:text-lg md:text-xl flex items-center justify-center gap-2.5 transition-all shadow-md pressable-btn cursor-pointer ${
            canCrossReady
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-b-4 border-emerald-700 animate-soft-pulse ring-4 ring-emerald-300'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white border-b-4 border-emerald-800'
          }`}
        >
          <span className="text-2xl sm:text-3xl">🚶</span>
          <span>건넌다!</span>
        </button>
      </div>

      <div className="text-center text-xs font-bold text-slate-500">
        💡 어떤 순서로 해야 안전할까요? 버튼을 눌러 안전 행동을 직접 찾아보세요!
      </div>
    </div>
  );
};
