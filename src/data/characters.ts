import { Character, LevelInfo } from '../types';

export const CHARACTERS: Character[] = [
  {
    id: 'char_boy_1',
    name: '민우',
    title: '씩씩한 민우',
    shirtColorName: '노란색',
    shirtHex: '#FBBF24', // Warm yellow
    skinHex: '#FED7AA',
    hairHex: '#451A03',
    hairStyle: 'short',
    genderTone: '남자 어린이 · 씩씩하고 밝은 친구',
    tagline: '신호등을 잘 보고 안전하게 걸어요!'
  },
  {
    id: 'char_girl_1',
    name: '서아',
    title: '다정한 서아',
    shirtColorName: '연분홍색',
    shirtHex: '#F472B6', // Warm pastel pink
    skinHex: '#FED7AA',
    hairHex: '#3E2723',
    hairStyle: 'pigtails',
    genderTone: '여자 어린이 · 다정하고 꼼꼼한 친구',
    tagline: '왼쪽, 오른쪽 자동차를 꼭 살펴요!'
  },
  {
    id: 'char_boy_2',
    name: '준서',
    title: '멋진 준서',
    shirtColorName: '연하늘색',
    shirtHex: '#38BDF8', // Sky blue
    skinHex: '#FED7AA',
    hairHex: '#1E293B',
    hairStyle: 'cap',
    genderTone: '남자 어린이 · 호기심 많고 멋진 친구',
    tagline: '자동차가 멈췄는지 두 눈으로 확인해요!'
  },
  {
    id: 'char_girl_2',
    name: '지우',
    title: '단정한 지우',
    shirtColorName: '연초록색',
    shirtHex: '#34D399', // Sage green
    skinHex: '#FED7AA',
    hairHex: '#18181B',
    hairStyle: 'curly', // styled as cute bob haircut with pink hairpin in SVG
    genderTone: '여자 어린이 · 차분하고 지혜로운 친구',
    tagline: '멈추고, 살피고, 손을 번쩍 들고 건너요!'
  }
];

export const LEVELS: LevelInfo[] = [
  {
    id: 1,
    title: '안전하게 건너요!',
    subtitle: '멈춘다! 살핀다! 건넌다!',
    badge: '실전 미션',
    description: '노란 안전선에 멈추고, 좌우를 살핀 후 파란불에 건너요.',
    targetObjective: '보행 안전 3원칙 체득하기'
  }
];
