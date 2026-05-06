import { useState } from 'react';
import type { QuizQuestion } from '../types';

interface QuizViewProps {
  questions: QuizQuestion[];
  onComplete: () => void;
  isCompleted: boolean;
}

export function QuizView({ questions, onComplete, isCompleted }: QuizViewProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[currentQ];

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === question.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ + 1 < questions.length) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
      if (!isCompleted) {
        onComplete();
      }
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="max-w-xl mx-auto py-16 px-6 text-center slide-up">
        <div className="text-6xl mb-4">
          {score === questions.length ? '\uD83C\uDF89' : score >= questions.length / 2 ? '\uD83D\uDC4D' : '\uD83D\uDCAA'}
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h2>
        <p className="text-slate-400 mb-6">
          You scored {score}/{questions.length}
        </p>
        <div className="w-48 mx-auto bg-dark-700 rounded-full h-4 mb-8">
          <div
            className={`rounded-full h-4 transition-all duration-700 ${
              score === questions.length
                ? 'bg-success'
                : score >= questions.length / 2
                ? 'bg-accent'
                : 'bg-orange-500'
            }`}
            style={{ width: `${(score / questions.length) * 100}%` }}
          />
        </div>
        {score < questions.length && (
          <button
            onClick={handleRetry}
            className="px-6 py-3 bg-dark-700 hover:bg-dark-600 text-white rounded-xl transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 slide-up">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-sm text-slate-400">
          Question {currentQ + 1}/{questions.length}
        </span>
        <div className="flex-1 bg-dark-700 rounded-full h-2">
          <div
            className="bg-accent rounded-full h-2 transition-all duration-300"
            style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-sm text-xp">{score} correct</span>
      </div>

      <div className="bg-dark-800 rounded-xl border border-dark-600 p-6 mb-6">
        <h3 className="text-lg font-bold text-white whitespace-pre-wrap">
          {question.question}
        </h3>
      </div>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          let style =
            'bg-dark-700 border-dark-600 text-slate-300 hover:bg-dark-600 hover:border-dark-500';
          if (answered) {
            if (index === question.correctIndex) {
              style = 'bg-success/15 border-success/40 text-success';
            } else if (index === selected) {
              style = 'bg-red-500/15 border-red-500/40 text-red-400';
            } else {
              style = 'bg-dark-700/50 border-dark-600/50 text-slate-500';
            }
          } else if (index === selected) {
            style = 'bg-accent/15 border-accent/40 text-accent-light';
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={answered}
              className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${style}`}
            >
              <span
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                  answered && index === question.correctIndex
                    ? 'bg-success/20'
                    : answered && index === selected
                    ? 'bg-red-500/20'
                    : 'bg-dark-600'
                }`}
              >
                {String.fromCharCode(65 + index)}
              </span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {answered && (
        <div
          className={`p-4 rounded-xl border mb-6 slide-up ${
            selected === question.correctIndex
              ? 'bg-success/10 border-success/30'
              : 'bg-orange-500/10 border-orange-500/30'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">
              {selected === question.correctIndex ? '\u2705' : '\uD83D\uDCA1'}
            </span>
            <span
              className={`font-bold ${
                selected === question.correctIndex ? 'text-success' : 'text-orange-400'
              }`}
            >
              {selected === question.correctIndex ? 'Correct!' : 'Not quite!'}
            </span>
          </div>
          <p className="text-slate-300 text-sm">{question.explanation}</p>
        </div>
      )}

      {answered && (
        <div className="flex justify-center">
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-accent hover:bg-accent-light text-dark-900 rounded-xl font-bold transition-all hover:scale-105"
          >
            {currentQ + 1 < questions.length ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      )}
    </div>
  );
}
