export type EatingType = 'fuel' | 'intuitive' | 'emotional' | 'fog';

export interface Question {
  id: number;
  type: EatingType;
  text: string;
}

export interface ResultData {
  title: string;
  emoji: string;
  animal: string;
  desc: string;
  color: string; // Tailwind v4 클래스용
}