export type QuizDifficulty = 'easy' | 'medium' | 'hard';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct answer
  difficulty: QuizDifficulty;
  explanation?: string;
}

export interface QuizReward {
  ingredientId: string;
  amount: number;
}

export interface QuizResult {
  correct: boolean;
  reward?: QuizReward;
  explanation?: string;
}