export type LessonType = 'theory' | 'code' | 'quiz' | 'challenge';

export interface CodeExercise {
  instructions: string;
  starterCode: string;
  solution: string;
  tests: TestCase[];
  hints?: string[];
}

export interface TestCase {
  input?: string;
  expectedOutput: string;
  description: string;
}

export interface ChallengeTestCase {
  input: string;
  expected: string;
  description: string;
}

export interface ChallengeExercise {
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  examples: Array<{ input: string; output: string; explanation?: string }>;
  functionName: string;
  starterCode: string;
  solution: string;
  testCases: ChallengeTestCase[];
  hints: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  xp: number;
  theory?: string;
  codeExercise?: CodeExercise;
  challenge?: ChallengeExercise;
  quiz?: QuizQuestion[];
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  icon: string;
  chapters: Chapter[];
}

export interface UserProgress {
  completedLessons: string[];
  xp: number;
  streak: number;
  lastActiveDate: string;
  level: number;
}
