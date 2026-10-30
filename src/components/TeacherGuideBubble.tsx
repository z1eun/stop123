import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface TeacherGuideBubbleProps {
  message: string;
  subMessage?: string;
  statusType?: 'normal' | 'success' | 'warning' | 'hint';
  onReplayVoice?: () => void;
  isVoiceActive?: boolean;
}

export const TeacherGuideBubble: React.FC<TeacherGuideBubbleProps> = ({
  message,
  subMessage,
  statusType = 'normal',
  onReplayVoice,
  isVoiceActive = true,
}) => {
  const getTheme = () => {
    switch (statusType) {
      case 'success':
        return {
          bg: 'bg-emerald-50 border-emerald-200',
          text: 'text-emerald-900',
          badge: 'bg-emerald-500 text-white',
          icon: '🎉',
        };
      case 'warning':
        return {
          bg: 'bg-amber-50 border-amber-300',
          text: 'text-amber-900',
          badge: 'bg-amber-500 text-white',
          icon: '✋',
        };
      case 'hint':
        return {
          bg: 'bg-sky-50 border-sky-200',
          text: 'text-sky-900',
          badge: 'bg-sky-500 text-white',
          icon: '💡',
        };
      default:
        return {
          bg: 'bg-white border-amber-200',
          text: 'text-slate-800',
          badge: 'bg-amber-400 text-amber-950',
          icon: '📢',
        };
    }
  };

  const theme = getTheme();

  const handleSpeakClick = () => {
    soundManager.playClick();
    if (onReplayVoice) {
      onReplayVoice();
    } else {
      soundManager.speak(message + (subMessage ? ` ${subMessage}` : ''));
    }
  };

  return (
    <div
      className={`relative w-full p-4 sm:p-5 rounded-2xl border-2 shadow-sm ${theme.bg} ${theme.text} transition-all duration-300 flex items-center justify-between gap-4`}
    >
      <div className="flex items-start gap-3 sm:gap-4 flex-1">
        {/* Friendly Teacher Avatar / Badge */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 border-2 border-white shadow-sm flex items-center justify-center shrink-0 text-2xl select-none">
          {theme.icon}
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${theme.badge}`}>
              안전선생님 말씀
            </span>
            {statusType === 'success' && (
              <span className="flex items-center text-xs font-bold text-emerald-600 gap-1 animate-pulse">
                <Sparkles className="w-3.5 h-3.5" /> 참 잘했어요!
              </span>
            )}
          </div>
          <h3 className="text-base sm:text-lg md:text-xl font-extrabold leading-snug tracking-tight text-wrap">
            {message}
          </h3>
          {subMessage && (
            <p className="text-xs sm:text-sm font-semibold opacity-85 mt-1">
              {subMessage}
            </p>
          )}
        </div>
      </div>

      {/* Voice Read-aloud button for toddlers who cannot read yet */}
      <button
        onClick={handleSpeakClick}
        aria-label="안내 음성 다시 듣기"
        title="선생님 목소리로 다시 들어요"
        className="shrink-0 p-3 sm:p-3.5 rounded-xl bg-white hover:bg-amber-100 border border-amber-200 text-amber-700 shadow-xs pressable-btn flex flex-col items-center gap-1 group"
      >
        <Volume2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="text-[10px] font-bold text-amber-800 whitespace-nowrap">소리 듣기</span>
      </button>
    </div>
  );
};
