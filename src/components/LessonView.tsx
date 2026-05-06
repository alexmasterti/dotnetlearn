import type { Chapter, Lesson } from '../types';
import { TheoryView } from './TheoryView';
import { CodeExerciseView } from './CodeExerciseView';
import { ChallengeView } from './ChallengeView';
import { QuizView } from './QuizView';

interface LessonViewProps {
  chapter: Chapter;
  lesson: Lesson;
  isCompleted: boolean;
  onComplete: () => void;
  onBack: () => void;
  onNext: () => void;
  hasNext: boolean;
}

export function LessonView({
  chapter,
  lesson,
  isCompleted,
  onComplete,
  onBack,
  onNext,
  hasNext,
}: LessonViewProps) {
  const typeLabels: Record<string, string> = {
    theory: 'Theory',
    code: 'Coding Exercise',
    quiz: 'Quiz',
    challenge: 'Challenge',
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-dark-800 border-b border-dark-600 px-4 py-3 flex items-center gap-4 shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
        >
          {'\u2190'} Back
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-slate-500">{chapter.title}</div>
          <div className="text-sm font-medium text-white truncate">{lesson.title}</div>
        </div>
        <span className="text-xs px-2 py-1 bg-dark-700 rounded-md text-slate-400">
          {typeLabels[lesson.type]}
        </span>
        <span className="text-xs text-xp">+{lesson.xp} XP</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {lesson.type === 'theory' && lesson.theory && (
          <TheoryView
            content={lesson.theory}
            onComplete={onComplete}
            isCompleted={isCompleted}
          />
        )}

        {lesson.type === 'code' && lesson.codeExercise && (
          <CodeExerciseView
            exercise={lesson.codeExercise}
            onComplete={onComplete}
            isCompleted={isCompleted}
          />
        )}

        {lesson.type === 'challenge' && lesson.challenge && (
          <ChallengeView
            challenge={lesson.challenge}
            onComplete={onComplete}
            isCompleted={isCompleted}
          />
        )}

        {lesson.type === 'challenge' && !lesson.challenge && lesson.codeExercise && (
          <CodeExerciseView
            exercise={lesson.codeExercise}
            onComplete={onComplete}
            isCompleted={isCompleted}
          />
        )}

        {lesson.type === 'quiz' && lesson.quiz && (
          <QuizView
            questions={lesson.quiz}
            onComplete={onComplete}
            isCompleted={isCompleted}
          />
        )}
      </div>

      {isCompleted && hasNext && (
        <div className="bg-dark-800 border-t border-dark-600 px-4 py-3 flex justify-center shrink-0">
          <button
            onClick={onNext}
            className="px-6 py-2.5 bg-accent hover:bg-accent-light text-dark-900 rounded-xl font-bold transition-all hover:scale-105 flex items-center gap-2"
          >
            Next Lesson {'\u2192'}
          </button>
        </div>
      )}
    </div>
  );
}
