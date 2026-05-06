import { useState, useMemo } from 'react';
import type { QuizQuestion } from '../types';
import { csharpCourse } from '../data/csharp-curriculum';

interface ReviewModeProps {
  completedLessons: string[];
}

export function ReviewMode({ completedLessons }: ReviewModeProps) {
  const allQuestions = useMemo(() => {
    const qs: Array<QuizQuestion & { source: string }> = [];
    for (const ch of csharpCourse.chapters) {
      for (const lesson of ch.lessons) {
        if (lesson.quiz && completedLessons.includes(lesson.id)) {
          for (const q of lesson.quiz) {
            qs.push({ ...q, source: `${ch.title} - ${lesson.title}` });
          }
        }
      }
    }
    for (let i = qs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // eslint-disable-line react-hooks/purity
      [qs[i], qs[j]] = [qs[j], qs[i]];
    }
    return qs;
  }, [completedLessons]);

  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  if (allQuestions.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center slide-up">
        <div className="text-6xl mb-4">{'\uD83D\uDCDA'}</div>
        <h2 className="text-2xl font-bold text-white mb-2">No Reviews Available</h2>
        <p className="text-slate-400">Complete some quiz lessons first to unlock spaced repetition review.</p>
      </div>
    );
  }

  const question = allQuestions[idx % allQuestions.length];

  const handleAnswer = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    setTotal((t) => t + 1);
    if (i === question.correctIndex) setScore((s) => s + 1);
  };

  const handleNext = () => {
    setIdx((i) => i + 1);
    setSelected(null);
    setAnswered(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 slide-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Review Mode</h2>
          <p className="text-sm text-slate-400">Spaced repetition - reinforce what you've learned</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-xp">{score}/{total}</div>
          <div className="text-xs text-slate-500">correct</div>
        </div>
      </div>

      <div className="text-xs text-slate-500 mb-3">From: {question.source}</div>

      <div className="bg-dark-800 rounded-xl border border-dark-600 p-6 mb-4">
        <h3 className="text-lg font-bold text-white whitespace-pre-wrap">{question.question}</h3>
      </div>

      <div className="space-y-3 mb-4">
        {question.options.map((opt, i) => {
          let style = 'bg-dark-700 border-dark-600 text-slate-300 hover:bg-dark-600';
          if (answered) {
            if (i === question.correctIndex) style = 'bg-success/15 border-success/40 text-success';
            else if (i === selected) style = 'bg-red-500/15 border-red-500/40 text-red-400';
            else style = 'bg-dark-700/50 border-dark-600/50 text-slate-500';
          }
          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={answered}
              className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${style}`}
            >
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold bg-dark-600 shrink-0">
                {String.fromCharCode(65 + i)}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {answered && (
        <>
          <div className={`p-4 rounded-xl border mb-4 slide-up ${
            selected === question.correctIndex
              ? 'bg-success/10 border-success/30'
              : 'bg-orange-500/10 border-orange-500/30'
          }`}>
            <p className="text-slate-300 text-sm">{question.explanation}</p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-accent hover:bg-accent-light text-dark-900 rounded-xl font-bold transition-all hover:scale-105"
            >
              Next Question
            </button>
          </div>
        </>
      )}
    </div>
  );
}
