interface XpNotificationProps {
  xp: number | null;
}

export function XpNotification({ xp }: XpNotificationProps) {
  if (xp === null) return null;

  return (
    <div className="fixed top-8 right-8 z-50 xp-pop">
      <div className="bg-dark-800 border border-xp/40 rounded-xl px-5 py-3 shadow-lg shadow-xp/10 flex items-center gap-3">
        <span className="text-2xl">{'\u2B50'}</span>
        <div>
          <div className="text-xp font-bold text-lg">+{xp} XP</div>
          <div className="text-xs text-slate-400">Great work!</div>
        </div>
      </div>
    </div>
  );
}
