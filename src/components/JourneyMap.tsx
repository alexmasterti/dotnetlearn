import { useMemo, useState } from 'react';
import type { Chapter, Lesson } from '../types';

interface JourneyMapProps {
  chapters: Chapter[];
  completedLessons: string[];
  onSelectLesson: (chapterId: string, lessonId: string) => void;
}

function LessonNode({
  lesson,
  isCompleted,
  isLocked,
  isCurrent,
  query,
  onClick,
}: {
  lesson: Lesson;
  isCompleted: boolean;
  isLocked: boolean;
  isCurrent: boolean;
  query: string;
  onClick: () => void;
}) {
  const typeIcons: Record<string, string> = {
    theory: '📖',
    code: '💻',
    quiz: '❓',
    challenge: '🏆',
  };

  return (
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`group relative flex items-center gap-3 w-full p-3 rounded-xl transition-all text-left ${
        isCompleted
          ? 'bg-success/10 border border-success/30 hover:bg-success/15'
          : isCurrent
          ? 'bg-accent/15 border border-accent/40 pulse-glow hover:bg-accent/20'
          : isLocked
          ? 'bg-dark-700/50 border border-dark-600/50 opacity-50 cursor-not-allowed'
          : 'bg-dark-700 border border-dark-600 hover:bg-dark-600 hover:border-dark-500'
      }`}
    >
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 ${
          isCompleted
            ? 'bg-success/20'
            : isCurrent
            ? 'bg-accent/20'
            : 'bg-dark-600'
        }`}
      >
        {isCompleted ? '✔️' : isLocked ? '🔒' : typeIcons[lesson.type]}
      </div>

      <div className="flex-1 min-w-0">
        <div
          className={`font-medium text-sm truncate ${
            isCompleted
              ? 'text-success'
              : isCurrent
              ? 'text-accent-light'
              : isLocked
              ? 'text-slate-500'
              : 'text-slate-300'
          }`}
        >
          {highlightMatch(lesson.title, query)}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-slate-500 capitalize">{lesson.type}</span>
          <span className="text-xs text-xp">+{lesson.xp} XP</span>
        </div>
      </div>

      {isCurrent && (
        <span className="text-xs font-bold bg-accent text-dark-900 px-2 py-1 rounded-md shrink-0">
          START
        </span>
      )}
    </button>
  );
}

/**
 * Render a string with a single substring highlighted (case-insensitive).
 * Returns the original string when query is empty or doesn't match.
 */
function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  const idx = lower.indexOf(q);
  if (idx < 0) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-accent/30 text-accent-light rounded px-0.5">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export function JourneyMap({ chapters, completedLessons, onSelectLesson }: JourneyMapProps) {
  const [query, setQuery] = useState('');

  const allLessons: { chapterId: string; lesson: Lesson }[] = useMemo(() => {
    const out: { chapterId: string; lesson: Lesson }[] = [];
    chapters.forEach((ch) => {
      ch.lessons.forEach((l) => {
        out.push({ chapterId: ch.id, lesson: l });
      });
    });
    return out;
  }, [chapters]);

  const findCurrentIndex = () => {
    for (let i = 0; i < allLessons.length; i++) {
      if (!completedLessons.includes(allLessons[i].lesson.id)) return i;
    }
    return allLessons.length;
  };
  const currentIndex = findCurrentIndex();

  const trimmedQuery = query.trim();

  // Filtered view: keep chapters that match OR contain a matching lesson; for
  // chapters that match by title we still show all their lessons. Otherwise
  // we narrow to just the matching lessons. Empty query ⇒ everything.
  const filteredChapters = useMemo(() => {
    if (!trimmedQuery) return chapters;
    const q = trimmedQuery.toLowerCase();
    const out: Chapter[] = [];
    for (const ch of chapters) {
      const chapterMatch = ch.title.toLowerCase().includes(q);
      const matchingLessons = ch.lessons.filter((l) =>
        l.title.toLowerCase().includes(q)
      );
      if (chapterMatch) {
        out.push(ch);
      } else if (matchingLessons.length > 0) {
        out.push({ ...ch, lessons: matchingLessons });
      }
    }
    return out;
  }, [chapters, trimmedQuery]);

  const matchCount = trimmedQuery
    ? filteredChapters.reduce((sum, ch) => sum + ch.lessons.length, 0)
    : 0;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">
          C# & .NET Journey
        </h2>
        <p className="text-slate-400">
          {currentIndex >= allLessons.length
            ? 'Congratulations! You completed all lessons!'
            : `${completedLessons.length} of ${allLessons.length} lessons completed`}
        </p>
        <div className="w-full max-w-md mx-auto mt-4 bg-dark-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-accent to-success rounded-full h-3 transition-all duration-700"
            style={{
              width: `${(completedLessons.length / allLessons.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="mb-6 relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search chapters or lessons (e.g. records, switch, async)…"
          className="w-full bg-dark-700 border border-dark-600 focus:border-accent focus:outline-none rounded-xl py-2.5 px-4 pr-10 text-sm text-slate-100 placeholder-slate-500 transition-colors"
          aria-label="Search lessons"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-200 hover:bg-dark-600 transition-colors"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
        {trimmedQuery && (
          <p className="text-xs text-slate-500 mt-2 ml-1">
            {matchCount === 0
              ? 'No matches.'
              : `${matchCount} match${matchCount === 1 ? '' : 'es'} across ${filteredChapters.length} chapter${filteredChapters.length === 1 ? '' : 's'}`}
          </p>
        )}
      </div>

      <div className="space-y-8">
        {filteredChapters.length === 0 && trimmedQuery && (
          <div className="text-center text-slate-500 py-12">
            No lessons matched "{trimmedQuery}". Try a different keyword.
          </div>
        )}
        {filteredChapters.map((chapter) => {
          // Always count completion against the FULL chapter, so search
          // narrowing doesn't make a chapter look incomplete.
          const fullChapter = chapters.find((c) => c.id === chapter.id) ?? chapter;
          const chapterLessonsCompleted = fullChapter.lessons.filter((l) =>
            completedLessons.includes(l.id)
          ).length;
          const isChapterComplete = chapterLessonsCompleted === fullChapter.lessons.length;

          return (
            <div key={chapter.id} className="slide-up">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                    isChapterComplete ? 'bg-success/20' : 'bg-dark-700'
                  }`}
                >
                  {chapter.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {highlightMatch(chapter.title, trimmedQuery)}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {chapter.description} · {chapterLessonsCompleted}/{fullChapter.lessons.length}
                  </p>
                </div>
              </div>

              <div className="space-y-2 ml-6 border-l-2 border-dark-600 pl-4">
                {chapter.lessons.map((lesson) => {
                  const globalIdx = allLessons.findIndex(
                    (a) => a.lesson.id === lesson.id
                  );
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isCurrent = globalIdx === currentIndex;
                  // While searching, never lock — let the user jump anywhere.
                  const isLocked = !trimmedQuery && globalIdx > currentIndex && !isCompleted;

                  return (
                    <LessonNode
                      key={lesson.id}
                      lesson={lesson}
                      isCompleted={isCompleted}
                      isCurrent={isCurrent}
                      isLocked={isLocked}
                      query={trimmedQuery}
                      onClick={() => onSelectLesson(chapter.id, lesson.id)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
