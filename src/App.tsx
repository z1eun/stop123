/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GameScreen, Character } from './types';
import { CHARACTERS } from './data/characters';
import { StartScreen } from './components/StartScreen';
import { CharacterSelectScreen } from './components/CharacterSelectScreen';
import { LevelPlayer } from './components/LevelPlayer';
import { RewardScreen } from './components/RewardScreen';
import { EducatorModal } from './components/EducatorModal';
import { soundManager } from './utils/audio';
import { Maximize2, Minimize2, Volume2, VolumeX, BookOpen } from 'lucide-react';

export default function App() {
  const [screen, setScreen] = useState<GameScreen>('START');
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(CHARACTERS[0]);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isEducatorModalOpen, setIsEducatorModalOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Toggle audio mute
  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundManager.setMuted(next);
    soundManager.setVoiceMuted(next);
  };

  // Fullscreen support for electronic blackboards and tablets
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const handleStartGame = () => {
    setScreen('CHARACTER_SELECT');
  };

  const handleSelectCharacter = (char: Character) => {
    setSelectedCharacter(char);
    setScreen('LEVEL_PLAY');
  };

  const handleCompleteLevel = () => {
    setScreen('REWARD');
  };

  const handleRestartSameCharacter = () => {
    setScreen('LEVEL_PLAY');
  };

  const handleGoHome = () => {
    setScreen('START');
  };

  return (
    <div className="min-h-screen bg-[#F0FDF4] text-slate-800 flex flex-col justify-between selection:bg-amber-300">
      {/* Universal Top Header */}
      <header className="w-full bg-white/85 backdrop-blur-md border-b border-amber-200/80 px-4 sm:px-8 py-2.5 flex items-center justify-between z-30 select-none shadow-xs">
        {/* Brand Lockup */}
        <div
          onClick={handleGoHome}
          className="flex items-center gap-2 cursor-pointer group"
          title="처음으로 이동"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-black text-lg shadow-xs group-hover:scale-105 transition-transform">
            🚦
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black text-slate-800 tracking-tight leading-none">
              안전하게 건너요!
            </h1>
            <span className="text-[10px] font-extrabold text-amber-700">
              멈춘다! 살핀다! 건넌다!
            </span>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2">
          {/* Educator & Parents Guide Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              setIsEducatorModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold shadow-xs pressable-btn"
            title="교육 가이드"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">교육 가이드</span>
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={toggleMute}
            className="p-2 rounded-full bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 shadow-xs pressable-btn"
            aria-label={isMuted ? '소리 켜기' : '소리 끄기'}
            title={isMuted ? '소리 켜기' : '소리 끄기'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-600" />
            )}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 shadow-xs pressable-btn hidden sm:flex"
            aria-label="전체화면"
            title="전자칠판 / 전체화면"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 text-slate-700" />
            ) : (
              <Maximize2 className="w-4 h-4 text-slate-700" />
            )}
          </button>
        </div>
      </header>

      {/* Main Responsive 16:9 Aspect Ratio Container */}
      <main className="w-full flex-1 flex items-center justify-center p-3 sm:p-6 md:p-8">
        <div className="w-full max-w-5xl aspect-auto flex flex-col justify-center">
          {screen === 'START' && (
            <StartScreen
              onStart={handleStartGame}
              onOpenEducatorGuide={() => setIsEducatorModalOpen(true)}
              isMuted={isMuted}
              onToggleMute={toggleMute}
            />
          )}

          {screen === 'CHARACTER_SELECT' && (
            <CharacterSelectScreen
              initialCharacter={selectedCharacter}
              onSelectCharacter={handleSelectCharacter}
              onBack={() => setScreen('START')}
            />
          )}

          {screen === 'LEVEL_PLAY' && (
            <LevelPlayer
              character={selectedCharacter}
              onComplete={handleCompleteLevel}
              onExit={() => setScreen('CHARACTER_SELECT')}
            />
          )}

          {screen === 'REWARD' && (
            <RewardScreen
              character={selectedCharacter}
              onRestartSameCharacter={handleRestartSameCharacter}
              onGoHome={handleGoHome}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-2.5 px-4 text-center text-xs font-semibold text-slate-500 bg-white/60 border-t border-amber-100 select-none no-print">
        <div className="flex items-center justify-center gap-3">
          <span>어린이 교통안전 체험 시뮬레이션</span>
          <span>·</span>
          <span>만 3~5세 유치원·어린이집 교육용</span>
          <span>·</span>
          <span>「안전하게 건너요!」</span>
        </div>
      </footer>

      {/* Educator Guide Modal */}
      <EducatorModal
        isOpen={isEducatorModalOpen}
        onClose={() => setIsEducatorModalOpen(false)}
      />
    </div>
  );
}
