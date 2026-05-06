import { useState } from 'react';
import type { User } from '@supabase/supabase-js';
import type { UserProgress } from '../types';
import { DailyGoalWidget } from './DailyGoalWidget';

export type ViewType = 'journey' | 'lesson' | 'playground' | 'leaderboard' | 'review' | 'certificate' | 'settings';

interface SidebarProps {
  progress: UserProgress;
  activeView: ViewType;
  onNavigate: (view: ViewType) => void;
  dailyCompleted: number;
  dailyTarget: number;
  user: User | null;
  authLoading: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
}

const navItems: Array<{ view: ViewType; icon: string; label: string }> = [
  { view: 'journey', icon: '\uD83D\uDDFA\uFE0F', label: 'Journey' },
  { view: 'playground', icon: '\uD83D\uDEF9', label: 'Playground' },
  { view: 'review', icon: '\uD83D\uDD01', label: 'Review' },
  { view: 'leaderboard', icon: '\uD83C\uDFC6', label: 'Leaderboard' },
  { view: 'certificate', icon: '\uD83C\uDF93', label: 'Certificate' },
  { view: 'settings', icon: '\u2699\uFE0F', label: 'Settings' },
];

export function Sidebar({ progress, activeView, onNavigate, dailyCompleted, dailyTarget, user, authLoading, onSignIn, onSignOut }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const levelProgress = progress.xp % 100;

  const sidebar = (
    <>
      {/* Logo */}
      <div className="p-5 border-b border-dark-600 flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-bold text-accent cursor-pointer"
            onClick={() => { onNavigate('journey'); setMobileOpen(false); }}
          >
            DotNetLearn
          </h1>
          <p className="text-sm text-slate-400 mt-1">Master C# & .NET</p>
        </div>
        <button
          className="lg:hidden text-slate-400 text-2xl"
          onClick={() => setMobileOpen(false)}
        >
          {'\u2715'}
        </button>
      </div>

      {/* Stats */}
      <div className="p-4 space-y-3 overflow-y-auto">
        {/* Level */}
        <div className="bg-dark-700 rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Level {progress.level}</span>
            <span className="text-sm text-accent">{progress.xp} XP</span>
          </div>
          <div className="w-full bg-dark-600 rounded-full h-2">
            <div
              className="bg-accent rounded-full h-2 transition-all duration-500"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
        </div>

        {/* Streak */}
        <div className="bg-dark-700 rounded-xl p-3 flex items-center gap-3">
          <div className="text-2xl">{progress.streak > 0 ? '\uD83D\uDD25' : '\u2744\uFE0F'}</div>
          <div>
            <div className="text-lg font-bold text-white">
              {progress.streak} day{progress.streak !== 1 ? 's' : ''}
            </div>
            <div className="text-xs text-slate-400">
              {progress.streak > 0 ? 'Current streak' : 'Start a streak!'}
            </div>
          </div>
        </div>

        {/* Daily Goal */}
        <DailyGoalWidget completed={dailyCompleted} target={dailyTarget} />

        {/* Lessons completed */}
        <div className="bg-dark-700 rounded-xl p-3 flex items-center gap-3">
          <div className="text-2xl">{'\u2705'}</div>
          <div>
            <div className="text-lg font-bold text-white">
              {progress.completedLessons.length}
            </div>
            <div className="text-xs text-slate-400">Lessons completed</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="mt-2 px-3 flex-1">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => { onNavigate(item.view); setMobileOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-colors mb-1 ${
              activeView === item.view
                ? 'bg-accent/15 text-accent'
                : 'text-slate-400 hover:bg-dark-700 hover:text-white'
            }`}
          >
            <span>{item.icon}</span>
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Auth / Bottom */}
      <div className="p-4 border-t border-dark-600">
        {authLoading ? (
          <div className="text-xs text-slate-500 text-center">Loading...</div>
        ) : user ? (
          <div className="flex items-center gap-3">
            {user.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url as string}
                alt=""
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">
                {(user.user_metadata?.full_name as string)?.[0] || user.email?.[0]?.toUpperCase() || '?'}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white truncate">
                {(user.user_metadata?.full_name as string) || user.email}
              </div>
              <button
                onClick={onSignOut}
                className="text-xs text-slate-500 hover:text-red-400 transition-colors"
              >
                Sign out
              </button>
            </div>
            <div className="text-xs text-success" title="Synced to cloud">{'\u2601\uFE0F'}</div>
          </div>
        ) : (
          <button
            onClick={onSignIn}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-dark-700 hover:bg-dark-600 border border-dark-600 rounded-xl text-sm text-slate-300 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="lg:hidden fixed top-3 left-3 z-50 bg-dark-800 border border-dark-600 rounded-lg p-2 text-white"
        onClick={() => setMobileOpen(true)}
      >
        {'\u2630'}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 bg-dark-800 border-r border-dark-600 flex-col h-screen sticky top-0 shrink-0">
        {sidebar}
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-dark-800 border-r border-dark-600 flex flex-col transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebar}
      </aside>
    </>
  );
}
