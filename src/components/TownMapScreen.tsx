import React, { useEffect, useState } from 'react';
import { Character } from '../types';
import { CharacterSvg } from './CharacterSvg';
import { soundManager } from '../utils/audio';
import { Star, Shield, ArrowRight, Home, School } from 'lucide-react';
import { LEVELS } from '../data/characters';

interface TownMapScreenProps {
  character: Character;
  currentLevel: number;
  earnedStars: number;
  onEnterLevel: (levelId: number) => void;
  onChangeCharacter: () => void;
}

export const TownMapScreen: React.FC<TownMapScreenProps> = ({
  character,
  currentLevel,
  earnedStars,
  onEnterLevel,
  onChangeCharacter,
}) => {
  // Step nodes on the map:
  // 0: 우리 집
  // 1: 횡단보도 1 (Level 1)
  // 2: 횡단보도 2 (Level 2)
  // 3: 횡단보도 3 (Level 3)
  // 4: 유치원 도착 (Level 4 / finished)
  const [animatingStep, setAnimatingStep] = useState(currentLevel - 1);

  useEffect(() => {
    // Announce current step voice
    const timer = setTimeout(() => {
      setAnimatingStep(currentLevel);
      if (currentLevel <= 3) {
        const lvlInfo = LEVELS[currentLevel - 1];
        soundManager.speak(`마을 지도예요! ${lvlInfo.badge}, ${lvlInfo.title}로 이동해요!`);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [currentLevel]);

  const mapNodes = [
    { id: 0, label: '우리 집', icon: '🏠', desc: '출발지' },
    { id: 1, label: '신호등 횡단보도', icon: '🚦', desc: '레벨 1' },
    { id: 2, label: '자동차 주의 횡단보도', icon: '🚗', desc: '레벨 2' },
    { id: 3, label: '신호등 없는 횡단보도', icon: '🚶', desc: '레벨 3' },
    { id: 4, label: '병아리 유치원', icon: '🏫', desc: '도착지' },
  ];

  const currentLevelInfo = LEVELS[currentLevel - 1] || LEVELS[0];

  const handleStartMission = () => {
    soundManager.playSuccessChime();
    soundManager.speak(`${currentLevelInfo.title}! 멈추고 살피고 건너보아요!`);
    onEnterLevel(currentLevel);
  };

  return (
    <div className="relative w-full min-h-[580px] sm:min-h-[620px] flex flex-col items-center justify-between p-6 sm:p-8 bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-50 rounded-3xl border-4 border-amber-200/90 shadow-xl select-none">
      {/* Top Status Bar */}
      <div className="w-full flex items-center justify-between">
        {/* Character info & Change button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-amber-200 shadow-xs">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: character.shirtHex }}></span>
            <span className="text-xs font-black text-slate-800">{character.name} 친구</span>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onChangeCharacter();
            }}
            className="text-xs font-bold text-amber-700 hover:text-amber-900 bg-amber-100/80 px-2.5 py-1 rounded-full border border-amber-200 pressable-btn"
          >
            친구 변경
          </button>
        </div>

        {/* Safety Star Tracker (PRD: ⭐ 1 / 3) */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-amber-950 font-black text-sm shadow-xs border border-amber-500">
          <Star className="w-4 h-4 fill-amber-100 text-amber-950 animate-spin" style={{ animationDuration: '6s' }} />
          <span>안전별 {earnedStars} / 3</span>
        </div>
      </div>

      {/* Title */}
      <div className="text-center my-1">
        <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-200">
          마을 탐험 지도
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-1">
          유치원 가는 길을 함께 살펴봐요!
        </h2>
      </div>

      {/* Map Path Stage */}
      <div className="w-full max-w-4xl bg-white/80 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-inner relative my-auto overflow-hidden">
        {/* Background decorative path elements */}
        <div className="absolute inset-0 bg-radial from-amber-50/50 to-transparent pointer-events-none"></div>

        {/* Connecting Stone Path Line */}
        <div className="absolute top-1/2 left-12 right-12 -translate-y-1/2 h-4 bg-amber-200/80 rounded-full z-0 hidden sm:block">
          <div
            className="h-full bg-emerald-400 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${((currentLevel - 1) / 3) * 100}%` }}
          ></div>
        </div>

        {/* 5 Waypoint Nodes along the path */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-2">
          {mapNodes.map((node) => {
            const isPassed = node.id < currentLevel;
            const isCurrent = node.id === currentLevel;
            const isFuture = node.id > currentLevel;

            return (
              <div
                key={node.id}
                className={`flex flex-col items-center text-center p-3 sm:p-2 rounded-2xl transition-all ${
                  isCurrent
                    ? 'bg-amber-100/90 ring-4 ring-amber-400 shadow-md scale-105'
                    : isPassed
                    ? 'bg-emerald-50 border border-emerald-200 opacity-90'
                    : 'bg-stone-50 border border-stone-200 opacity-60'
                }`}
              >
                {/* Node Icon Circle */}
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-sm mb-2 relative ${
                    isCurrent
                      ? 'bg-amber-400 text-white animate-soft-pulse'
                      : isPassed
                      ? 'bg-emerald-400 text-white'
                      : 'bg-stone-200 text-stone-500'
                  }`}
                >
                  <span>{node.icon}</span>
                  {isPassed && (
                    <div className="absolute -top-1 -right-1 bg-emerald-600 text-white rounded-full p-0.5 text-xs font-bold">
                      ✓
                    </div>
                  )}
                  {isCurrent && (
                    <div className="absolute -top-2 bg-rose-500 text-white px-2 py-0.5 rounded-full text-[10px] font-black animate-bounce shadow-xs whitespace-nowrap">
                      현재 위치!
                    </div>
                  )}
                </div>

                {/* Node Label */}
                <span className="text-xs sm:text-sm font-black text-slate-800 line-clamp-1">
                  {node.label}
                </span>
                <span className="text-[10px] font-bold text-slate-500 mt-0.5">
                  {node.desc}
                </span>

                {/* Character preview at current node */}
                {isCurrent && (
                  <div className="mt-2 scale-75 transform -translate-y-1">
                    <CharacterSvg character={character} action="idle" size="sm" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Mission Card & Start Button */}
      <div className="w-full max-w-lg flex flex-col items-center gap-3">
        <div className="w-full p-4 rounded-2xl bg-white border-2 border-amber-300 shadow-md flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-xl">
              🚦
            </div>
            <div>
              <span className="text-[11px] font-black text-amber-600">
                {currentLevelInfo.badge} 미션
              </span>
              <h3 className="text-base font-black text-slate-800">
                {currentLevelInfo.title}
              </h3>
              <p className="text-xs font-bold text-slate-500">
                {currentLevelInfo.description}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleStartMission}
          className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-black text-xl sm:text-2xl shadow-lg border-b-4 border-emerald-700 pressable-btn flex items-center justify-center gap-3 animate-soft-pulse"
        >
          <span>{currentLevelInfo.badge} 미션 시작하기!</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
