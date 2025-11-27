export interface Scores {
  [key: string]: number;
}

export interface Question {
  id: string;
  label: string;
  fullText: string;
}

export interface ChartData {
  subject: string;
  A: number;
  fullMark: number;
}

export interface MaturityLevel {
  text: string;
  color: string;
  bgClass?: string;
}