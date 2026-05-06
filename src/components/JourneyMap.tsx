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
  onClick,
}: {
  lesson: Lesson;
  isCompleted: boolean;
  isLocked: boolean;
  isCurrent: boolean;
  onClick: () => void;
}) {
  const typeIcons: Record<string, string> = {
    theory: '\uD83D\uDCD6',
    code: '\uD83D\uDCBB',
    quiz: '\u2753',
    challenge: '\uD83C\uDFC6',
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
        {isCompleted ? '\u2714\uFE0F' : isLocked ? '\uD83D\uDD12' : typeIcons[lesson.type]}
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
          {lesson.title}
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

export function JourneyMap({ chapters, completedLessons, onSelectLesson }: JourneyMapProps) {
  const allLessons: { chapterId: string; lesson: Lesson }[] = [];
  chapters.forEach((ch) => {
    ch.lessons.forEach((l) => {
      allLessons.push({ chapterId: ch.id, lesson: l });
    });
  });

  const findCurrentIndex = () => {
    for (let i = 0; i < allLessons.length; i++) {
      if (!completedLessons.includes(allLessons[i].lesson.id)) return i;
    }
    return allLessons.length;
  };

  const currentIndex = findCurrentIndex();

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="text-center mb-10">
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

      <div className="space-y-8">
        {chapters.map((chapter) => {
          const chapterLessonsCompleted = chapter.lessons.filter((l) =>
            completedLessons.includes(l.id)
          ).length;
          const isChapterComplete = chapterLessonsCompleted === chapter.lessons.length;

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
                  <h3 className="text-lg font-bold text-white">{chapter.title}</h3>
                  <p className="text-sm text-slate-400">
                    {chapter.description} · {chapterLessonsCompleted}/{chapter.lessons.length}
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
                  const isLocked = globalIdx > currentIndex && !isCompleted;

                  return (
                    <LessonNode
                      key={lesson.id}
                      lesson={lesson}
                      isCompleted={isCompleted}
                      isCurrent={isCurrent}
                      isLocked={isLocked}
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
