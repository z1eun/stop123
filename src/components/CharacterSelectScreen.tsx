import React, { useState } from 'react';
import { CHARACTERS } from '../data/characters';
import { Character } from '../types';
import { CharacterSvg } from './CharacterSvg';
import { soundManager } from '../utils/audio';
import { ArrowLeft, CheckCircle2, User, Sparkles } from 'lucide-react';

interface CharacterSelectScreenProps {
  onSelectCharacter: (char: Character) => void;
  onBack: () => void;
  initialCharacter?: Character;
}

export const CharacterSelectScreen: React.FC<CharacterSelectScreenProps> = ({
  onSelectCharacter,
  onBack,
  initialCharacter,
}) => {
  const [selectedId, setSelectedId] = useState<string>(
    initialCharacter ? initialCharacter.id : CHARACTERS[0].id
  );
  
  // Custom name state
  const [childName, setChildName] = useState<string>(
    initialCharacter?.name || CHARACTERS[0].name
  );

  const selectedChar = CHARACTERS.find((c) => c.id === selectedId) || CHARACTERS[0];

  const handlePick = (char: Character) => {
    setSelectedId(char.id);
    // If the name was still one of the default character names, update it to the newly picked character
    const isDefaultName = CHARACTERS.some((c) => c.name === childName);
    if (isDefaultName) {
      setChildName(char.name);
    }
    soundManager.playTurnHead();
    soundManager.speak(`${char.name}! 안녕! 함께 횡단보도를 건너자!`);
  };

  const handleConfirm = () => {
    const finalName = childName.trim() || selectedChar.name;
    const customizedChar: Character = {
      ...selectedChar,
      name: finalName,
      title: `씩씩한 ${finalName}`,
    };

    soundManager.playSuccessChime();
    soundManager.speak(`${finalName} 친구, 출발! 횡단보도를 안전하게 건너보아요!`);
    onSelectCharacter(customizedChar);
  };

  return (
    <div className="relative w-full min-h-[580px] sm:min-h-[640px] flex flex-col items-center justify-between p-5 sm:p-7 bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-50 rounded-3xl border-4 border-amber-200/90 shadow-xl select-none">
      {/* Top Bar with Back Button */}
      <div className="w-full flex items-center justify-between">
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-stone-700 text-xs font-bold border border-stone-200 shadow-xs pressable-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>처음으로</span>
        </button>

        <span className="text-xs font-extrabold text-amber-800 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300">
          친구 선택 & 이름 입력
        </span>
      </div>

      {/* Header Prompt */}
      <div className="text-center my-1">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
          어떤 친구와 함께 건널까요?
        </h2>
        <p className="text-xs sm:text-sm font-bold text-amber-700 mt-0.5">
          좋아하는 옷차림의 친구를 터치하고, 내 이름을 적어주세요!
        </p>
      </div>

      {/* 4 Character Cards Grid */}
      <div className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-2">
        {CHARACTERS.map((char) => {
          const isSelected = char.id === selectedId;
          return (
            <div
              key={char.id}
              onClick={() => handlePick(char)}
              className={`relative flex flex-col items-center p-3 sm:p-4 rounded-3xl cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'bg-white shadow-xl ring-4 ring-amber-400 scale-105 border-2 border-amber-400 -translate-y-1.5'
                  : 'bg-white/70 hover:bg-white/95 shadow-sm border border-amber-200/80 hover:scale-102'
              }`}
            >
              {isSelected && (
                <div className="absolute -top-3 -right-2 bg-amber-500 text-white rounded-full p-1 shadow-md animate-bounce">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}

              {/* Character Avatar */}
              <div className="py-1">
                <CharacterSvg
                  character={char}
                  action={isSelected ? 'celebrating' : 'idle'}
                  size="md"
                />
              </div>

              {/* Tag & Name */}
              <div className="text-center mt-1 w-full">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-xs font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {char.genderTone.includes('남자') ? '👦 남자' : '👧 여자'}
                  </span>
                  <span
                    className="inline-block px-2 py-0.5 rounded-full text-[11px] font-black text-slate-800 border"
                    style={{ backgroundColor: `${char.shirtHex}33`, borderColor: char.shirtHex }}
                  >
                    {char.shirtColorName}
                  </span>
                </div>
                <h3 className="text-base font-black text-slate-800">{char.name}</h3>
                <p className="text-[11px] font-bold text-slate-500 mt-0.5 line-clamp-1">
                  {char.tagline}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Name Input Box (User requested: "캐릭터는 고르되 이름은 입력하게 해줘") */}
      <div className="w-full max-w-md bg-white p-4 rounded-2xl border-2 border-amber-300 shadow-md">
        <label htmlFor="child-name-input" className="block text-xs font-extrabold text-amber-800 mb-1.5 flex items-center gap-1.5">
          <User className="w-4 h-4 text-amber-600" />
          <span>횡단보도를 건널 어린이의 이름을 적어주세요:</span>
        </label>
        <div className="relative flex items-center">
          <input
            id="child-name-input"
            type="text"
            value={childName}
            maxLength={10}
            onChange={(e) => setChildName(e.target.value)}
            placeholder="이름 입력 (예: 김하늘, 민우)"
            className="w-full px-4 py-2.5 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-base sm:text-lg font-black text-slate-800 bg-amber-50/50"
          />
          {childName && (
            <span className="absolute right-3 text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
              친구
            </span>
          )}
        </div>
        <p className="text-[11px] font-semibold text-slate-500 mt-1.5">
          * 입력한 이름은 게임 안내 음성과 교통안전 달인 임명장에 멋지게 들어가요!
        </p>
      </div>

      {/* Launch Button */}
      <div className="w-full max-w-md mt-2">
        <button
          onClick={handleConfirm}
          className="w-full py-4 px-8 rounded-2xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-black text-xl sm:text-2xl shadow-lg border-b-4 border-amber-700 pressable-btn flex items-center justify-center gap-3 animate-soft-pulse"
        >
          <Sparkles className="w-6 h-6 text-yellow-200" />
          <span>{childName.trim() || selectedChar.name} 친구와 출발하기!</span>
          <span className="text-2xl">➔</span>
        </button>
      </div>
    </div>
  );
};
