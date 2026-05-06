import type { Theme } from '../hooks/useTheme';

interface SettingsProps {
  theme: Theme;
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: (on: boolean) => void;
  dailyTarget: number;
  onSetDailyTarget: (n: number) => void;
  userName: string;
  onSetUserName: (name: string) => void;
  onExportProgress: () => void;
  onImportProgress: () => void;
  onResetProgress: () => void;
}

export function Settings({
  theme, onToggleTheme, soundEnabled, onToggleSound,
  dailyTarget, onSetDailyTarget, userName, onSetUserName,
  onExportProgress, onImportProgress, onResetProgress,
}: SettingsProps) {
  return (
    <div className="max-w-xl mx-auto py-8 px-4 slide-up">
      <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>

      <div className="space-y-4">
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <label className="block text-sm text-slate-400 mb-2">Display Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => onSetUserName(e.target.value)}
            placeholder="Enter your name"
            className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent"
          />
        </div>

        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4 flex items-center justify-between">
          <div>
            <div className="text-white font-medium">Theme</div>
            <div className="text-sm text-slate-400">Toggle dark/light mode</div>
          </div>
          <button
            onClick={onToggleTheme}
            className="px-4 py-2 bg-dark-700 hover:bg-dark-600 rounded-lg text-white transition-colors"
          >
            {theme === 'dark' ? '\u2600\uFE0F Light' : '\uD83C\uDF19 Dark'}
          </button>
        </div>

        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4 flex items-center justify-between">
          <div>
            <div className="text-white font-medium">Sound Effects</div>
            <div className="text-sm text-slate-400">Play sounds on actions</div>
          </div>
          <button
            onClick={() => onToggleSound(!soundEnabled)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              soundEnabled ? 'bg-accent/20 text-accent' : 'bg-dark-700 text-slate-400'
            }`}
          >
            {soundEnabled ? '\uD83D\uDD0A On' : '\uD83D\uDD07 Off'}
          </button>
        </div>

        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="text-white font-medium mb-2">Daily Lesson Goal</div>
          <div className="flex gap-2">
            {[1, 3, 5, 10].map((n) => (
              <button
                key={n}
                onClick={() => onSetDailyTarget(n)}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  dailyTarget === n
                    ? 'bg-accent text-dark-900'
                    : 'bg-dark-700 text-slate-400 hover:bg-dark-600'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          <div className="text-white font-medium mb-3">Progress Data</div>
          <div className="flex gap-3">
            <button
              onClick={onExportProgress}
              className="flex-1 py-2 bg-dark-700 hover:bg-dark-600 rounded-lg text-slate-300 transition-colors text-sm"
            >
              Export Progress
            </button>
            <button
              onClick={onImportProgress}
              className="flex-1 py-2 bg-dark-700 hover:bg-dark-600 rounded-lg text-slate-300 transition-colors text-sm"
            >
              Import Progress
            </button>
          </div>
        </div>

        <div className="bg-dark-800 rounded-xl border border-red-500/20 p-4">
          <div className="text-white font-medium mb-1">Reset Progress</div>
          <div className="text-sm text-slate-400 mb-3">This will erase all your progress permanently.</div>
          <button
            onClick={onResetProgress}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors text-sm"
          >
            Reset All Progress
          </button>
        </div>
      </div>
    </div>
  );
}
