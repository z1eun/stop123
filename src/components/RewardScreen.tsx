import React, { useEffect, useState, useRef } from 'react';
import { Character } from '../types';
import { CharacterSvg } from './CharacterSvg';
import { soundManager } from '../utils/audio';
import { Star, Award, RotateCcw, Home, Printer, Share2, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RewardScreenProps {
  character: Character;
  onRestartSameCharacter: () => void;
  onGoHome: () => void;
}

export const RewardScreen: React.FC<RewardScreenProps> = ({
  character,
  onRestartSameCharacter,
  onGoHome,
}) => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [awardDate, setAwardDate] = useState('');

  useEffect(() => {
    // Set formatted today's date in Korean format
    const today = new Date();
    const formatted = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
    setAwardDate(formatted);

    // Initial victory audio and fanfare
    soundManager.playStarFanfare();
    soundManager.speak(
      `만세! 유치원에 무사히 도착했어요! ${character.name} 친구는 이제 교통안전 달인이에요! 멈추고, 살피고, 안전하게 건넜어요!`
    );

    // Continuous soft confetti for 3 seconds
    const end = Date.now() + 2500;
    const colors = ['#FBBF24', '#34D399', '#38BDF8', '#F472B6', '#F59E0B'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, [character]);

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <div className="relative w-full min-h-[580px] sm:min-h-[640px] flex flex-col items-center justify-between p-6 sm:p-8 bg-gradient-to-b from-amber-100 via-yellow-50 to-emerald-50 rounded-3xl border-4 border-amber-300 shadow-xl select-none">
      {/* Top Banner */}
      <div className="w-full flex items-center justify-between no-print">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-amber-200 shadow-xs">
          <Award className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-black text-amber-900">최종 목적지 도착 완료!</span>
        </div>

        {/* Certificate view toggle */}
        <button
          onClick={() => {
            soundManager.playClick();
            setShowCertificate(!showCertificate);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 text-xs font-black shadow-xs pressable-btn"
        >
          <Award className="w-4 h-4" />
          <span>{showCertificate ? '도착 축하 화면 보기' : '📜 달인 임명장 보기'}</span>
        </button>
      </div>

      {!showCertificate ? (
        // ARRIVAL CELEBRATION VIEW
        <div className="flex flex-col items-center text-center my-auto max-w-xl w-full">
          {/* Kindergarten building badge */}
          <div className="text-5xl mb-2 animate-bounce">🏫</div>

          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-400 text-amber-950 font-black text-sm mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-yellow-100" />
            <span>병아리 유치원 도착!</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight mb-2">
            🏆 교통안전 달인 탄생!
          </h1>

          <p className="text-lg sm:text-xl font-black text-amber-700 mb-4">
            "멈추고! 살피고! 안전하게 건넜어요!"
          </p>

          {/* 3 Safety Badges: 멈춤, 살핌, 건넘 */}
          <div className="flex items-center justify-center gap-3 my-2 p-3 bg-white/80 rounded-2xl border border-amber-200 shadow-sm">
            {[
              { label: '멈춘다', icon: '✋' },
              { label: '살핀다', icon: '👀' },
              { label: '건넌다', icon: '🚶' },
            ].map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 shadow-md animate-gentle-float"
                style={{ animationDelay: `${idx * 0.25}s` }}
              >
                <span className="text-xl">{step.icon}</span>
                <span className="text-[11px] font-black text-amber-950 mt-0.5">{step.label}</span>
              </div>
            ))}
          </div>
          <span className="text-xs font-black text-amber-900 mt-1">
            안전 3원칙(멈춤·살핌·건넘) 완벽 달성! ⭐⭐⭐
          </span>

          {/* Character Celebrating */}
          <div className="my-4">
            <CharacterSvg
              character={character}
              action="celebrating"
              size="lg"
            />
          </div>

          <p className="text-sm sm:text-base font-bold text-slate-600 max-w-md">
            {character.name} 친구와 함께 모든 횡단보도를 안전하게 건넜어요.<br />
            앞으로도 횡단보도 앞에서는 <strong>멈추고, 살피고, 안전하게</strong> 건너기로 약속해요!
          </p>

          {/* Certificate peek prompt */}
          <button
            onClick={() => {
              soundManager.playSuccessChime();
              setShowCertificate(true);
            }}
            className="mt-5 py-3 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-black text-lg shadow-md pressable-btn flex items-center gap-2"
          >
            <Award className="w-5 h-5" />
            <span>'교통안전 달인 임명장' 받기</span>
          </button>
        </div>
      ) : (
        // OFFICIAL CERTIFICATE VIEW (Printable & Downloadable)
        <div className="flex flex-col items-center w-full max-w-2xl my-auto">
          {/* Print area */}
          <div className="print-area w-full bg-white rounded-3xl p-6 sm:p-8 border-8 border-double border-amber-400 shadow-xl relative text-center">
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-3 left-3 text-amber-400 text-2xl select-none">❖</div>
            <div className="absolute top-3 right-3 text-amber-400 text-2xl select-none">❖</div>
            <div className="absolute bottom-3 left-3 text-amber-400 text-2xl select-none">❖</div>
            <div className="absolute bottom-3 right-3 text-amber-400 text-2xl select-none">❖</div>

            {/* Certificate Header */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="w-8 h-8 text-amber-500" />
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-wider">
                교통안전 달인 임명장
              </h2>
              <Award className="w-8 h-8 text-amber-500" />
            </div>

            <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full mb-4"></div>

            {/* Recipient */}
            <div className="my-3 flex items-center justify-center gap-4">
              <div className="p-2 bg-amber-50 rounded-2xl border-2 border-amber-200">
                <CharacterSvg character={character} action="celebrating" size="sm" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-slate-500">씩씩한 어린이</span>
                <h3 className="text-2xl sm:text-3xl font-black text-amber-600">
                  {character.name} 친구
                </h3>
              </div>
            </div>

            {/* Certificate Body */}
            <div className="my-4 px-4 py-3 bg-amber-50/60 rounded-2xl border border-amber-200 text-slate-700 text-sm sm:text-base leading-relaxed font-bold">
              <p className="mb-2">
                위 어린이는 가상 마을의 횡단보도를 탐험하며<br />
                <strong>「멈춘다! 살핀다! 건넌다!」</strong><br />
                교통안전 3원칙을 훌륭하게 실천하였으므로<br />
                이 임명장을 수여합니다.
              </p>
              <div className="flex items-center justify-center gap-2 text-amber-700 text-xs sm:text-sm font-black mt-2">
                <span>⭐ 멈춤 완료</span>
                <span>·</span>
                <span>⭐ 좌우 살핌 완료</span>
                <span>·</span>
                <span>⭐ 차 멈춤 확인 완료</span>
              </div>
            </div>

            {/* Date & Seal */}
            <div className="mt-6 flex items-center justify-between px-6 pt-2 border-t border-dashed border-amber-300">
              <span className="text-xs sm:text-sm font-bold text-slate-500">
                수여일: {awardDate}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-extrabold text-slate-700">
                  어린이 교통안전 교육원
                </span>
                <div className="w-10 h-10 rounded-full bg-rose-500 text-white font-black text-[10px] flex items-center justify-center border-2 border-rose-600 shadow-xs">
                  직인
                </div>
              </div>
            </div>
          </div>

          {/* Print & Back buttons */}
          <div className="flex items-center gap-3 mt-4 no-print">
            <button
              onClick={handlePrint}
              className="py-2.5 px-5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-md pressable-btn flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>임명장 인쇄하기</span>
            </button>
            <button
              onClick={() => setShowCertificate(false)}
              className="py-2.5 px-5 rounded-2xl bg-white hover:bg-stone-100 text-stone-700 font-extrabold text-sm border border-stone-300 shadow-xs pressable-btn"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* Bottom Action Controls (PRD 10.3) */}
      <div className="w-full max-w-md grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-amber-200/80 no-print">
        {/* 1. 다시 도전하기 */}
        <button
          onClick={() => {
            soundManager.playClick();
            onRestartSameCharacter();
          }}
          className="py-3.5 px-4 rounded-2xl bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-black text-base sm:text-lg shadow-md border-b-4 border-sky-700 pressable-btn flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>다시 도전하기</span>
        </button>

        {/* 2. 처음으로 */}
        <button
          onClick={() => {
            soundManager.playClick();
            onGoHome();
          }}
          className="py-3.5 px-4 rounded-2xl bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-amber-950 font-black text-base sm:text-lg shadow-md border-b-4 border-amber-600 pressable-btn flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          <span>처음으로</span>
        </button>
      </div>
    </div>
  );
};
