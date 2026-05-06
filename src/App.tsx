import { useState, useCallback, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import type { ViewType } from './components/Sidebar';
import { JourneyMap } from './components/JourneyMap';
import { LessonView } from './components/LessonView';
import { XpNotification } from './components/XpNotification';
import { Playground } from './components/Playground';
import { Leaderboard } from './components/Leaderboard';
import { ReviewMode } from './components/ReviewMode';
import { Certificate } from './components/Certificate';
import { Settings } from './components/Settings';
import { Confetti } from './components/Confetti';
import { useProgress } from './hooks/useProgress';
import { useTheme } from './hooks/useTheme';
import { useSounds } from './hooks/useSounds';
import { useDailyGoals } from './hooks/useDailyGoals';
import { useAuth } from './hooks/useAuth';
import { useCloudSync } from './hooks/useCloudSync';
import { csharpCourse } from './data/csharp-curriculum';
import type { Chapter, Lesson } from './types';

interface ActiveLesson {
  chapter: Chapter;
  lesson: Lesson;
}

export default function App() {
  const { progress, completeLesson, isCompleted, xpGained, resetProgress, loadFromCloud } = useProgress();
  const { theme, toggle: toggleTheme } = useTheme();
  const sounds = useSounds();
  const { goal, increment: incrementGoal, setTarget: setDailyTarget } = useDailyGoals();
  const { user, loading: authLoading, signInWithGoogle, signOut } = useAuth();
  useCloudSync(user, progress, loadFromCloud);

  const [view, setView] = useState<ViewType>('journey');
  const [activeLesson, setActiveLesson] = useState<ActiveLesson | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [prevLevel, setPrevLevel] = useState(progress.level);
  const [userName, setUserName] = useState(() => localStorage.getItem('dotnetlearn_username') || '');
  const [soundEnabled, setSoundEnabled] = useState(() => localStorage.getItem('dotnetlearn_sounds') !== 'off');

  useEffect(() => {
    if (user?.user_metadata?.full_name && !userName) {
      const name = user.user_metadata.full_name as string;
      setUserName(name); // eslint-disable-line react-hooks/set-state-in-effect
      localStorage.setItem('dotnetlearn_username', name);
    }
  }, [user, userName]);

  useEffect(() => {
    if (progress.level > prevLevel) {
      sounds.levelUp();
      setShowConfetti(true); // eslint-disable-line react-hooks/set-state-in-effect
      setTimeout(() => setShowConfetti(false), 3000);
    }
    setPrevLevel(progress.level);
  }, [progress.level, prevLevel, sounds]);

  const allLessons: { chapter: Chapter; lesson: Lesson }[] = [];
  csharpCourse.chapters.forEach((ch) => {
    ch.lessons.forEach((l) => {
      allLessons.push({ chapter: ch, lesson: l });
    });
  });

  const handleSelectLesson = useCallback(
    (chapterId: string, lessonId: string) => {
      const chapter = csharpCourse.chapters.find((c) => c.id === chapterId);
      const lesson = chapter?.lessons.find((l) => l.id === lessonId);
      if (chapter && lesson) {
        setActiveLesson({ chapter, lesson });
        setView('lesson');
        sounds.click();
      }
    },
    [sounds]
  );

  const handleComplete = useCallback(() => {
    if (activeLesson && !isCompleted(activeLesson.lesson.id)) {
      completeLesson(activeLesson.lesson.id, activeLesson.lesson.xp);
      incrementGoal();
      sounds.complete();
    }
  }, [activeLesson, completeLesson, incrementGoal, isCompleted, sounds]);

  const handleNext = useCallback(() => {
    if (!activeLesson) return;
    const currentIdx = allLessons.findIndex(
      (a) => a.lesson.id === activeLesson.lesson.id
    );
    if (currentIdx < allLessons.length - 1) {
      const next = allLessons[currentIdx + 1];
      setActiveLesson(next);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLesson]);

  const handleBack = useCallback(() => {
    setView('journey');
    setActiveLesson(null);
  }, []);

  const handleNavigate = useCallback((v: ViewType) => {
    setView(v);
    if (v !== 'lesson') setActiveLesson(null);
  }, []);

  const handleSetUserName = useCallback((name: string) => {
    setUserName(name);
    localStorage.setItem('dotnetlearn_username', name);
  }, []);

  const handleToggleSound = useCallback((on: boolean) => {
    setSoundEnabled(on);
    sounds.setEnabled(on);
  }, [sounds]);

  const handleExport = useCallback(() => {
    const data = {
      progress: localStorage.getItem('dotnetlearn_progress'),
      username: localStorage.getItem('dotnetlearn_username'),
      theme: localStorage.getItem('dotnetlearn_theme'),
      dailyGoal: localStorage.getItem('dotnetlearn_daily_goal'),
      sounds: localStorage.getItem('dotnetlearn_sounds'),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dotnetlearn-progress.json';
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const handleImport = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string);
          if (data.progress) localStorage.setItem('dotnetlearn_progress', data.progress);
          if (data.username) localStorage.setItem('dotnetlearn_username', data.username);
          if (data.theme) localStorage.setItem('dotnetlearn_theme', data.theme);
          if (data.dailyGoal) localStorage.setItem('dotnetlearn_daily_goal', data.dailyGoal);
          if (data.sounds) localStorage.setItem('dotnetlearn_sounds', data.sounds);
          window.location.reload();
        } catch {
          // ignore invalid files
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }, []);

  const handleReset = useCallback(() => {
    if (confirm('Are you sure? This will erase ALL progress permanently.')) {
      resetProgress();
      localStorage.removeItem('dotnetlearn_username');
      localStorage.removeItem('dotnetlearn_daily_goal');
      window.location.reload();
    }
  }, [resetProgress]);

  const currentLessonIdx = activeLesson
    ? allLessons.findIndex((a) => a.lesson.id === activeLesson.lesson.id)
    : -1;

  return (
    <div className="flex min-h-screen">
      <Sidebar
        progress={progress}
        activeView={view}
        onNavigate={handleNavigate}
        dailyCompleted={goal.completed}
        dailyTarget={goal.target}
        user={user}
        authLoading={authLoading}
        onSignIn={signInWithGoogle}
        onSignOut={signOut}
      />

      <main className="flex-1 min-w-0 lg:ml-0 ml-0">
        {view === 'journey' && (
          <JourneyMap
            chapters={csharpCourse.chapters}
            completedLessons={progress.completedLessons}
            onSelectLesson={handleSelectLesson}
          />
        )}

        {view === 'lesson' && activeLesson && (
          <LessonView
            key={activeLesson.lesson.id}
            chapter={activeLesson.chapter}
            lesson={activeLesson.lesson}
            isCompleted={isCompleted(activeLesson.lesson.id)}
            onComplete={handleComplete}
            onBack={handleBack}
            onNext={handleNext}
            hasNext={currentLessonIdx < allLessons.length - 1}
          />
        )}

        {view === 'playground' && <Playground />}

        {view === 'leaderboard' && (
          <Leaderboard progress={progress} userName={userName} />
        )}

        {view === 'review' && (
          <ReviewMode completedLessons={progress.completedLessons} />
        )}

        {view === 'certificate' && (
          <Certificate
            userName={userName || 'Learner'}
            courseName="C# & .NET"
            completedLessons={progress.completedLessons.length}
            totalLessons={allLessons.length}
            xp={progress.xp}
          />
        )}

        {view === 'settings' && (
          <Settings
            theme={theme}
            onToggleTheme={toggleTheme}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            dailyTarget={goal.target}
            onSetDailyTarget={setDailyTarget}
            userName={userName}
            onSetUserName={handleSetUserName}
            onExportProgress={handleExport}
            onImportProgress={handleImport}
            onResetProgress={handleReset}
          />
        )}
      </main>

      <XpNotification xp={xpGained} />
      <Confetti active={showConfetti} />
    </div>
  );
}
