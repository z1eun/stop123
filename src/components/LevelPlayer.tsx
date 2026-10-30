import React, { useState, useEffect, useRef } from 'react';
import { Character, CharacterAction } from '../types';
import { CrosswalkEnvironment } from './CrosswalkEnvironment';
import { TeacherGuideBubble } from './TeacherGuideBubble';
import { ActionControls } from './ActionControls';
import { TrafficLightState } from './TrafficLightSvg';
import { soundManager } from '../utils/audio';
import { Star, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LevelPlayerProps {
  character: Character;
  onComplete: () => void;
  onExit: () => void;
}

export const LevelPlayer: React.FC<LevelPlayerProps> = ({
  character,
  onComplete,
  onExit,
}) => {
  // Action checklist states
  const [hasStopped, setHasStopped] = useState<boolean>(false);
  const [lookedLeft, setLookedLeft] = useState<boolean>(false);
  const [lookedRight, setLookedRight] = useState<boolean>(false);
  const [isCrossed, setIsCrossed] = useState<boolean>(false);

  // Character sprite state
  const [characterAction, setCharacterAction] = useState<CharacterAction>('idle');
  const [characterProgress, setCharacterProgress] = useState<number>(0);

  // Traffic light starts on YELLOW (주황불)
  const [trafficLightState, setTrafficLightState] = useState<TrafficLightState>('YELLOW');

  // Car state: starts moving from right
  const [carPosition, setCarPosition] = useState<number>(2);
  const [isCarStopped, setIsCarStopped] = useState<boolean>(false);
  const [isCarMoving, setIsCarMoving] = useState<boolean>(true);

  // Guide messages
  const [guideMessage, setGuideMessage] = useState<string>('');
  const [subMessage, setSubMessage] = useState<string>('');
  const [guideStatus, setGuideStatus] = useState<'normal' | 'success' | 'warning' | 'hint'>('normal');

  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [isCrossingBusy, setIsCrossingBusy] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Initial State: Signal starts YELLOW and transitions to RED with car stopping
  useEffect(() => {
    setHasStopped(false);
    setLookedLeft(false);
    setLookedRight(false);
    setIsCrossed(false);
    setCharacterAction('idle');
    setCharacterProgress(0);
    setTrafficLightState('YELLOW');
    setCarPosition(2);
    setIsCarStopped(false);
    setIsCarMoving(true);

    const msg = `${character.name} 친구! 신호등이 주황불이에요! 곧 빨간불로 바뀔 거예요!`;
    const sub = '어떤 순서로 행동해야 안전할까요? 버튼을 눌러보세요!';
    setGuideMessage(msg);
    setSubMessage(sub);
    setGuideStatus('hint');
    soundManager.speak(`${msg} ${sub}`);

    // Transition from Yellow -> Red after 2.2 seconds
    timerRef.current = setTimeout(() => {
      setTrafficLightState('RED');
      setCarPosition(14);
      setIsCarStopped(true);
      setIsCarMoving(false);
      soundManager.playCarBrake();

      const redMsg = '신호등이 빨간불로 바뀌고 자동차가 정지선에 멈췄어요!';
      const redSub = '횡단보도 앞에서는 먼저 무엇을 해야 할까요? 버튼을 눌러보세요!';
      setGuideMessage(redMsg);
      setSubMessage(redSub);
      setGuideStatus('normal');
      soundManager.speak(`${redMsg} ${redSub}`);
    }, 2200);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [character.name]);

  // When both left and right are checked, activate green signal
  const handleBothSidesChecked = () => {
    setTrafficLightState('GREEN');
    soundManager.playPedestrianChirp();
    soundManager.playSuccessChime();

    const msg = '왼쪽과 오른쪽을 모두 확인했어요! 신호등이 파란불로 바뀌었어요!';
    const sub = '이제 안전해요! 손을 번쩍 들고 "건넌다!" 버튼을 눌러요!';
    setGuideMessage(msg);
    setSubMessage(sub);
    setGuideStatus('success');
    soundManager.speak(`${msg} ${sub}`);
  };

  // 1. ✋ 멈춘다 버튼 핸들러
  const handleStop = () => {
    if (isCrossingBusy || isCrossed) return;

    if (!hasStopped) {
      // Correct first step!
      setHasStopped(true);
      setCharacterAction('stopped');
      soundManager.playSuccessChime();

      const msg = '참 잘했어요! 횡단보도 앞 노란 안전선에 딱 멈췄어요!';
      const sub = '이제 차가 오는지 "왼쪽 보기"와 "오른쪽 보기"로 살펴볼까요?';
      setGuideMessage(msg);
      setSubMessage(sub);
      setGuideStatus('success');
      soundManager.speak(`${msg} ${sub}`);
    } else {
      // Already stopped
      soundManager.playTurnHead();
      const msg = '이미 노란 안전선 뒤에 잘 멈춰 서 있어요!';
      const sub = !lookedLeft || !lookedRight
        ? '이제 차가 오는지 왼쪽과 오른쪽을 살펴볼까요?'
        : '좌우를 모두 살폈으니 이제 "건넌다!" 버튼을 눌러보세요!';
      setGuideMessage(msg);
      setSubMessage(sub);
      setGuideStatus('hint');
      soundManager.speak(msg);
    }
  };

  // 2. ⬅️ 왼쪽 보기 핸들러
  const handleLookLeft = () => {
    if (isCrossingBusy || isCrossed) return;

    if (!hasStopped) {
      // Wrong order! Not stopped yet
      soundManager.playGentleAlert();
      const msg = '다시 한번 생각해 볼까요? 🤔';
      const sub = '횡단보도 앞에서는 먼저 무엇을 해야 할까요? "멈춘다!"를 먼저 눌러 노란 안전선에 서요!';
      setGuideMessage(msg);
      setSubMessage(sub);
      setGuideStatus('warning');
      soundManager.speak('다시 한번 생각해 볼까요? 횡단보도 앞에서는 먼저 멈춰 서야 해요!');
      return;
    }

    // Stopped, now looking left
    setCharacterAction('look_left');
    setLookedLeft(true);
    soundManager.playTurnHead();

    setTimeout(() => {
      setCharacterAction('idle');
      if (!lookedRight) {
        const msg = '왼쪽 도로를 잘 살폈어요! 참 잘했어요!';
        const sub = '이번엔 반대쪽인 "오른쪽 보기"도 눌러 살펴볼까요?';
        setGuideMessage(msg);
        setSubMessage(sub);
        setGuideStatus('success');
        soundManager.speak(`${msg} ${sub}`);
      } else {
        // Both done!
        handleBothSidesChecked();
      }
    }, 600);
  };

  // 3. ➡️ 오른쪽 보기 핸들러
  const handleLookRight = () => {
    if (isCrossingBusy || isCrossed) return;

    if (!hasStopped) {
      // Wrong order! Not stopped yet
      soundManager.playGentleAlert();
      const msg = '다시 한번 생각해 볼까요? 🤔';
      const sub = '횡단보도 앞에서는 먼저 무엇을 해야 할까요? "멈춘다!"를 먼저 눌러 노란 안전선에 서요!';
      setGuideMessage(msg);
      setSubMessage(sub);
      setGuideStatus('warning');
      soundManager.speak('다시 한번 생각해 볼까요? 횡단보도 앞에서는 먼저 멈춰 서야 해요!');
      return;
    }

    // Stopped, now looking right
    setCharacterAction('look_right');
    setLookedRight(true);
    soundManager.playTurnHead();

    setTimeout(() => {
      setCharacterAction('idle');
      if (!lookedLeft) {
        const msg = '오른쪽 도로를 잘 살폈어요! 참 잘했어요!';
        const sub = '이번엔 반대쪽인 "왼쪽 보기"도 눌러 살펴볼까요?';
        setGuideMessage(msg);
        setSubMessage(sub);
        setGuideStatus('success');
        soundManager.speak(`${msg} ${sub}`);
      } else {
        // Both done!
        handleBothSidesChecked();
      }
    }, 600);
  };

  // 4. 🚶 건넌다 버튼 핸들러
  const handleCross = () => {
    if (isCrossingBusy || isCrossed) return;

    // Safety checks:
    // 1) Has child stopped?
    if (!hasStopped) {
      soundManager.playGentleAlert();
      const msg = '다시 한번 생각해 볼까요? 🤔';
      const sub = '멈추지도 않고 바로 건너면 정말 위험해요! 먼저 "멈춘다!"를 눌러요!';
      setGuideMessage(msg);
      setSubMessage(sub);
      setGuideStatus('warning');
      soundManager.speak('다시 한번 생각해 볼까요? 멈추지 않고 바로 건너면 위험해요! 먼저 멈춰 서요!');
      return;
    }

    // 2) Has child looked left and right?
    if (!lookedLeft || !lookedRight) {
      soundManager.playGentleAlert();
      const remaining = !lookedLeft && !lookedRight
        ? '왼쪽과 오른쪽'
        : !lookedLeft
        ? '왼쪽'
        : '오른쪽';
      const msg = '다시 한번 생각해 볼까요? 🤔';
      const sub = `차가 오는지 아직 ${remaining}을 다 살피지 않았어요! 좌우를 먼저 살펴볼까요?`;
      setGuideMessage(msg);
      setSubMessage(sub);
      setGuideStatus('warning');
      soundManager.speak(`다시 한번 생각해 볼까요? 차가 오는지 ${remaining}을 먼저 살펴야 해요!`);
      return;
    }

    // 3) All conditions met! Safe to cross!
    setIsCrossingBusy(true);
    setCharacterAction('crossing');
    soundManager.playPedestrianChirp();

    const crossMsg = '좋아요! 손을 번쩍 들고 횡단보도를 안전하게 건너요!';
    setGuideMessage(crossMsg);
    setSubMessage('좌우를 살피며 씩씩하게 걸어가요!');
    setGuideStatus('success');
    soundManager.speak(crossMsg);

    // Animate stepping across the crosswalk
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      if (progress >= 100) {
        clearInterval(interval);
        setCharacterProgress(100);
        setIsCrossed(true);
        setIsCrossingBusy(false);
        handleArrival();
      } else {
        setCharacterProgress(progress);
      }
    }, 70);
  };

  const handleArrival = () => {
    setCharacterAction('celebrating');
    soundManager.playStarFanfare();

    try {
      confetti({
        particleCount: 110,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#FBBF24', '#34D399', '#38BDF8', '#F472B6', '#F59E0B'],
      });
    } catch {}

    const successMsg = `만세! ${character.name} 친구가 유치원에 안전하게 도착했어요!`;
    setGuideMessage(successMsg);
    setSubMessage('멈춘다! 살핀다! 건넌다! 순서대로 완벽하게 실천했어요!');
    setGuideStatus('success');
    soundManager.speak(successMsg);

    setTimeout(() => {
      setShowSuccessModal(true);
    }, 900);
  };

  const canCrossReady = hasStopped && lookedLeft && lookedRight;

  return (
    <div className="relative w-full min-h-[580px] sm:min-h-[640px] flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-b from-sky-50 via-amber-50/50 to-stone-50 rounded-3xl border-4 border-amber-300 shadow-xl select-none">
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between mb-1.5">
        <button
          onClick={() => {
            soundManager.playClick();
            onExit();
          }}
          className="text-xs font-bold text-slate-700 bg-white/90 hover:bg-white px-3 py-1.5 rounded-full border border-stone-200 shadow-xs pressable-btn cursor-pointer"
        >
          ← 캐릭터 다시 고르기
        </button>

        {/* Character & Child name tag */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-amber-200 shadow-xs">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: character.shirtHex }}
          ></span>
          <span className="text-xs font-black text-slate-800">
            {character.name} 친구의 도전
          </span>
        </div>
      </div>

      {/* Crosswalk Simulation Scene with painted road, zebra stripes, yellow line, car, and traffic light */}
      <div className="w-full my-1">
        <CrosswalkEnvironment
          character={character}
          characterAction={characterAction}
          characterProgress={characterProgress}
          trafficLightState={trafficLightState}
          carPosition={carPosition}
          isCarStopped={isCarStopped}
          isCarMoving={isCarMoving}
          isLookingLeft={lookedLeft}
          isLookingRight={lookedRight}
        />
      </div>

      {/* Teacher Guide Speech Bubble */}
      <div className="w-full my-2">
        <TeacherGuideBubble
          message={guideMessage}
          subMessage={subMessage}
          statusType={guideStatus}
        />
      </div>

      {/* 4 Large Action Buttons: Always enabled so kids can think and try! */}
      <div className="w-full">
        <ActionControls
          onStop={handleStop}
          onLookLeft={handleLookLeft}
          onLookRight={handleLookRight}
          onCross={handleCross}
          hasStopped={hasStopped}
          lookedLeft={lookedLeft}
          lookedRight={lookedRight}
          canCrossReady={canCrossReady}
        />
      </div>

      {/* Success Celebration Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center shadow-2xl border-4 border-amber-400 relative">
            <div className="w-20 h-20 rounded-full bg-amber-100 border-4 border-amber-400 mx-auto flex items-center justify-center text-4xl mb-4 animate-bounce">
              🏆
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs mb-2">
              횡단보도 안전 미션 완벽 성공!
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mb-2">
              {character.name} 친구, 최고예요!
            </h3>

            <p className="text-base font-bold text-slate-600 mb-4 leading-snug">
              "멈추고! 살피고! 안전하게 건넜어요!"<br />
              순서를 스스로 생각하며 멋지게 건넜어요!
            </p>

            <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-amber-50 border border-amber-200 mb-6">
              <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
              <span className="text-base font-black text-amber-900">
                교통안전 달인 자격 획득!
              </span>
            </div>

            <button
              onClick={() => {
                soundManager.playSuccessChime();
                onComplete();
              }}
              className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-black text-xl shadow-lg border-b-4 border-emerald-700 pressable-btn flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>교통안전 달인 임명장 받기!</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
