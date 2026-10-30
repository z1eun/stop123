import React from 'react';
import { X, BookOpen, ShieldCheck, Heart, Award } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface EducatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EducatorModal: React.FC<EducatorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-amber-300 p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
          aria-label="닫기"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-2xl font-black shadow-xs">
            📚
          </div>
          <div>
            <span className="text-xs font-extrabold text-amber-600 uppercase tracking-wider">
              교사 및 학부모 지도 안내서
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800">
              유아 교통안전 교육 가이드
            </h2>
          </div>
        </div>

        {/* Core Principles */}
        <div className="space-y-4 text-slate-700">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
            <h3 className="font-extrabold text-amber-950 text-base mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              만 3~5세 유아 교통안전 핵심 3원칙
            </h3>
            <ul className="space-y-2 text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="font-bold text-amber-600 shrink-0">1. 멈춘다:</span>
                <span>횡단보도 경계석(턱)에서 1~2걸음 뒤 노란 발자국에 멈춰 섭니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-amber-600 shrink-0">2. 살핀다:</span>
                <span>차가 다가오는 <strong>왼쪽 먼저</strong> 확인 후 오른쪽, 다시 왼쪽을 살핍니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-amber-600 shrink-0">3. 건넌다:</span>
                <span>초록불이 켜지고 차가 <strong>완전히 멈춘 것을 확인</strong>한 뒤, 손을 번쩍 들고 운전자와 눈을 맞추며 걸어 건넙니다.</span>
              </li>
            </ul>
          </div>

          {/* Child Developmental Characteristics */}
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-sm">
            <h3 className="font-extrabold text-sky-950 text-base mb-2 flex items-center gap-2">
              <Heart className="w-5 h-5 text-sky-600" />
              유아의 신체·인지 발달 특성 이해
            </h3>
            <p className="leading-relaxed mb-2 text-slate-700">
              • 유아는 시야각이 성인(180도)의 2/3 수준(약 120도)으로 좁아 양옆에서 접근하는 차량을 인지하기 어렵습니다.
            </p>
            <p className="leading-relaxed mb-2 text-slate-700">
              • 초록불이 켜지면 반사적으로 뛰쳐나가려는 경향이 강하므로 <strong>'초록불에도 멈춰서 자동차 확인하기'</strong>(레벨 2 미션)가 필수적입니다.
            </p>
            <p className="leading-relaxed text-slate-700">
              • 키가 작아 운전자의 사각지대에 들어가기 쉬우므로 <strong>'손을 높이 들기'</strong>와 <strong>'밝은 옷 입기'</strong>를 권장합니다.
            </p>
          </div>

          {/* Classroom blackboard / Home Practice Ideas */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-sm">
            <h3 className="font-extrabold text-emerald-950 text-base mb-2 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              가정 및 원에서의 연계 실천 활동
            </h3>
            <p className="leading-relaxed text-slate-700">
              1. <strong>거실/교실 바닥 횡단보도 놀이:</strong> 종이테이프로 횡단보도를 만들고 '멈춘다, 살핀다, 건넌다' 구호를 외치며 함께 걸어보세요.
            </p>
            <p className="leading-relaxed text-slate-700 mt-1.5">
              2. <strong>시뮬레이션 완료 인증:</strong> 3단계를 모두 완료하면 나오는 '교통안전 달인 임명장'을 인쇄하여 아이에게 선물하고 칭찬해 주세요!
            </p>
          </div>
        </div>

        {/* Bottom Confirm Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-extrabold shadow-md pressable-btn"
          >
            확인했어요! 함께 안전하게 건너요
          </button>
        </div>
      </div>
    </div>
  );
};
