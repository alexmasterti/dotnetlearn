import { useState, useEffect, useCallback } from 'react';
import type { UserProgress } from '../types';

const STORAGE_KEY = 'dotnetlearn_progress';

const getToday = () => new Date().toISOString().split('T')[0];

const calcLevel = (xp: number) => Math.floor(xp / 100) + 1;

const defaultProgress: UserProgress = {
  completedLessons: [],
  xp: 0,
  streak: 0,
  lastActiveDate: '',
  level: 1,
};

function loadProgress(): UserProgress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultProgress;
    const parsed = JSON.parse(saved);
    const today = getToday();
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (parsed.lastActiveDate !== today && parsed.lastActiveDate !== yesterday) {
      parsed.streak = 0;
    }
    return parsed;
  } catch {
    return defaultProgress;
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);
  const [xpGained, setXpGained] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const completeLesson = useCallback((lessonId: string, xp: number) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      const today = getToday();
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      let newStreak = prev.streak;
      if (prev.lastActiveDate !== today) {
        newStreak = prev.lastActiveDate === yesterday ? prev.streak + 1 : 1;
      }
      const newXp = prev.xp + xp;
      return {
        completedLessons: [...prev.completedLessons, lessonId],
        xp: newXp,
        streak: newStreak,
        lastActiveDate: today,
        level: calcLevel(newXp),
      };
    });
    setXpGained(xp);
    setTimeout(() => setXpGained(null), 1500);
  }, []);

  const isCompleted = useCallback(
    (lessonId: string) => progress.completedLessons.includes(lessonId),
    [progress.completedLessons]
  );

  const loadFromCloud = useCallback((cloudProgress: UserProgress) => {
    setProgress(cloudProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudProgress));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { progress, completeLesson, isCompleted, xpGained, resetProgress, loadFromCloud };
}
