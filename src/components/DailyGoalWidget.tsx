interface DailyGoalWidgetProps {
  completed: number;
  target: number;
}

export function DailyGoalWidget({ completed, target }: DailyGoalWidgetProps) {
  const pct = Math.min((completed / target) * 100, 100);
  const isDone = completed >= target;

  return (
    <div className={`bg-dark-700 rounded-xl p-3 ${isDone ? 'glow-success' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-400">
          {isDone ? '\uD83C\uDF89 Daily goal reached!' : 'Daily goal'}
        </span>
        <span className="text-sm text-white font-bold">
          {Math.min(completed, target)}/{target}
        </span>
      </div>
      <div className="w-full bg-dark-600 rounded-full h-2">
        <div
          className={`rounded-full h-2 transition-all duration-500 ${
            isDone ? 'bg-success' : 'bg-accent'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-xs text-slate-500 mt-1">
        {isDone
          ? 'Come back tomorrow for more!'
          : `${target - completed} more lesson${target - completed !== 1 ? 's' : ''} to go`}
      </div>
    </div>
  );
}
