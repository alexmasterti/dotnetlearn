import type { UserProgress } from '../types';

const FAKE_USERS = [
  { name: 'DotNetDev42', xp: 1850, streak: 45, avatar: '\uD83E\uDDD1\u200D\uD83D\uDCBB' },
  { name: 'CSharpNinja', xp: 1420, streak: 30, avatar: '\uD83E\uDD77' },
  { name: 'AsyncAce', xp: 1180, streak: 22, avatar: '\u26A1' },
  { name: 'LINQQueen', xp: 980, streak: 18, avatar: '\uD83D\uDC51' },
  { name: 'BlazorBoss', xp: 750, streak: 12, avatar: '\uD83D\uDD25' },
  { name: 'GenericGuru', xp: 620, streak: 9, avatar: '\uD83E\uDDD9' },
  { name: 'EntityExplorer', xp: 480, streak: 7, avatar: '\uD83D\uDDFA\uFE0F' },
  { name: 'NuGetNerd', xp: 310, streak: 5, avatar: '\uD83D\uDCE6' },
  { name: 'DelegateDoug', xp: 180, streak: 3, avatar: '\uD83E\uDD96' },
];

interface LeaderboardProps {
  progress: UserProgress;
  userName: string;
}

export function Leaderboard({ progress, userName }: LeaderboardProps) {
  const allUsers = [
    ...FAKE_USERS,
    { name: userName || 'You', xp: progress.xp, streak: progress.streak, avatar: '\uD83C\uDF1F' },
  ].sort((a, b) => b.xp - a.xp);

  const userRank = allUsers.findIndex((u) => u.name === (userName || 'You')) + 1;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 slide-up">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Leaderboard</h2>
        <p className="text-slate-400">Your rank: #{userRank} of {allUsers.length}</p>
      </div>

      <div className="space-y-2">
        {allUsers.map((user, idx) => {
          const isYou = user.name === (userName || 'You');
          const rank = idx + 1;
          const medalColors = ['text-yellow-400', 'text-slate-300', 'text-amber-600'];

          return (
            <div
              key={user.name}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                isYou
                  ? 'bg-accent/15 border-accent/40 glow-accent'
                  : 'bg-dark-800 border-dark-600'
              }`}
            >
              <div className={`w-8 text-center font-bold text-lg ${
                rank <= 3 ? medalColors[rank - 1] : 'text-slate-500'
              }`}>
                {rank <= 3 ? ['\uD83E\uDD47', '\uD83E\uDD48', '\uD83E\uDD49'][rank - 1] : `#${rank}`}
              </div>

              <div className="text-2xl">{user.avatar}</div>

              <div className="flex-1">
                <div className={`font-bold ${isYou ? 'text-accent-light' : 'text-white'}`}>
                  {user.name} {isYou && '(You)'}
                </div>
                <div className="text-xs text-slate-400">
                  {user.streak > 0 ? `\uD83D\uDD25 ${user.streak} day streak` : 'No streak'}
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-xp">{user.xp} XP</div>
                <div className="text-xs text-slate-500">Level {Math.floor(user.xp / 100) + 1}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
