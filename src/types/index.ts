// Dealbreakers types
export interface DealbreakerQuestion {
  id: string;
  text: string;
}

export interface DealbreakerAnswer {
  questionId: string;
  value: number;
}

// Cube types
export interface AxisLabels {
  xLabels: string[];
  yLabels: (number | string)[];
  xGroupLabels: string[];
  showGroupLabels: boolean;
  yAxisTitle: string;
}

export type CubeFace = 'qualities' | 'purpose' | 'time' | 'back' | 'left' | 'bottom';

export interface UserLineValues {
  values: number[];
}

// Narratives types
export interface NarrativeRanking {
  id: string;
  rank: number;
}

// More type definitions as needed...
