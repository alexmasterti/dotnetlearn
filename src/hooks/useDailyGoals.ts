import { useState, useEffect, useCallback } from 'react';

interface DailyGoal {
  date: string;
  target: number;
  completed: number;
}

const STORAGE_KEY = 'dotnetlearn_daily_goal';
const getToday = () => new Date().toISOString().split('T')[0];

function load(): DailyGoal {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (saved.date === getToday()) return saved;
  } catch { /* ignore */ }
  return { date: getToday(), target: 3, completed: 0 };
}

export function useDailyGoals() {
  const [goal, setGoal] = useState<DailyGoal>(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goal));
  }, [goal]);

  const increment = useCallback(() => {
    setGoal((g) => {
      const today = getToday();
      if (g.date !== today) return { date: today, target: g.target, completed: 1 };
      return { ...g, completed: g.completed + 1 };
    });
  }, []);

  const setTarget = useCallback((target: number) => {
    setGoal((g) => ({ ...g, target }));
  }, []);

  const isComplete = goal.completed >= goal.target;

  return { goal, increment, setTarget, isComplete };
}
