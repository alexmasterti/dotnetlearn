import { useRef, useCallback } from 'react';

interface CertificateProps {
  userName: string;
  courseName: string;
  completedLessons: number;
  totalLessons: number;
  xp: number;
}

export function Certificate({ userName, courseName, completedLessons, totalLessons, xp }: CertificateProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isComplete = completedLessons === totalLessons;

  const generateCertificate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const w = 800, h = 560;
    canvas.width = w;
    canvas.height = h;

    // Background
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#0f1117');
    grad.addColorStop(1, '#1a1d27');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Border
    ctx.strokeStyle = '#7c3aed';
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, w - 40, h - 40);
    ctx.strokeStyle = '#7c3aed44';
    ctx.lineWidth = 1;
    ctx.strokeRect(30, 30, w - 60, h - 60);

    // Corner decorations
    const corners = [[40, 40], [w - 40, 40], [40, h - 40], [w - 40, h - 40]];
    for (const [cx, cy] of corners) {
      ctx.fillStyle = '#7c3aed';
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Trophy
    ctx.font = '48px serif';
    ctx.textAlign = 'center';
    ctx.fillText('\uD83C\uDFC6', w / 2, 100);

    // Title
    ctx.fillStyle = '#7c3aed';
    ctx.font = 'bold 28px Inter, system-ui';
    ctx.fillText('Certificate of Completion', w / 2, 150);

    // Line
    ctx.strokeStyle = '#7c3aed44';
    ctx.beginPath();
    ctx.moveTo(200, 170);
    ctx.lineTo(600, 170);
    ctx.stroke();

    // Name
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '16px Inter, system-ui';
    ctx.fillText('This certifies that', w / 2, 210);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px Inter, system-ui';
    ctx.fillText(userName || 'Learner', w / 2, 260);

    // Course
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '16px Inter, system-ui';
    ctx.fillText('has successfully completed the', w / 2, 310);
    ctx.fillStyle = '#4ade80';
    ctx.font = 'bold 24px Inter, system-ui';
    ctx.fillText(`${courseName} Course`, w / 2, 350);

    // Stats
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px Inter, system-ui';
    ctx.fillText(`${completedLessons} lessons completed  |  ${xp} XP earned`, w / 2, 400);

    // Date
    ctx.fillStyle = '#64748b';
    ctx.font = '14px Inter, system-ui';
    ctx.fillText(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), w / 2, 440);

    // Branding
    ctx.fillStyle = '#7c3aed';
    ctx.font = 'bold 16px Inter, system-ui';
    ctx.fillText('DotNetLearn', w / 2, 500);
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Inter, system-ui';
    ctx.fillText('Master C# & .NET', w / 2, 520);
  }, [userName, courseName, completedLessons, xp]);

  const download = () => {
    generateCertificate();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `dotnetlearn-${courseName.toLowerCase()}-certificate.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 slide-up">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Certificate</h2>
        <p className="text-slate-400">
          {isComplete
            ? 'Congratulations! Download your certificate below.'
            : `Complete all ${totalLessons} lessons to earn your certificate (${completedLessons}/${totalLessons})`}
        </p>
      </div>

      <div className={`bg-dark-800 rounded-xl border border-dark-600 p-6 flex flex-col items-center ${
        !isComplete ? 'opacity-50' : ''
      }`}>
        <canvas
          ref={canvasRef}
          className="w-full max-w-[600px] rounded-lg"
          width={800}
          height={560}
        />
        {isComplete && (
          <button
            onClick={download}
            className="mt-4 px-6 py-3 bg-accent hover:bg-accent-light text-dark-900 rounded-xl font-bold transition-all hover:scale-105"
          >
            Download Certificate
          </button>
        )}
      </div>

      <span className="hidden" ref={() => { setTimeout(generateCertificate, 100); }} />
    </div>
  );
}
