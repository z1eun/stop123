export interface Character {
  id: string;
  name: string;
  title: string;
  shirtColorName: string;
  shirtHex: string;
  skinHex: string;
  hairHex: string;
  hairStyle: 'short' | 'pigtails' | 'curly' | 'cap';
  genderTone: string;
  tagline: string;
}

export type GameScreen = 
  | 'START' 
  | 'CHARACTER_SELECT' 
  | 'LEVEL_PLAY' 
  | 'REWARD';

export type CharacterAction = 
  | 'idle' 
  | 'stopped' 
  | 'look_left' 
  | 'look_right' 
  | 'crossing' 
  | 'celebrating' 
  | 'waiting'
  | 'hesitant';

export interface LevelInfo {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  targetObjective: string;
}
