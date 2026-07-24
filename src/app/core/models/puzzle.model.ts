export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface WordSearchResponse {
  grid: string[][];
  words: string[];
}

export interface TopicItem {
  id: string;
  name: string;
}