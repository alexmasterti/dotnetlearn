interface TheoryViewProps {
  content: string;
  onComplete: () => void;
  isCompleted: boolean;
}

function renderMarkdown(md: string): string {
  let html = md;

  // Code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_match, _lang, code) => {
    return `<pre class="bg-dark-900 border border-dark-600 rounded-lg p-4 my-4 overflow-x-auto"><code class="text-sm text-emerald-300 font-mono">${escapeHtml(code.trim())}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-dark-700 text-accent-light px-1.5 py-0.5 rounded text-sm font-mono">$1</code>');

  // Tables
  html = html.replace(/\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)*)/g, (_match, header, body) => {
    const headers = header.split('|').map((h: string) => h.trim()).filter(Boolean);
    const rows = body.trim().split('\n').map((row: string) =>
      row.split('|').map((c: string) => c.trim()).filter(Boolean)
    );
    return `<div class="overflow-x-auto my-4"><table class="w-full text-sm">
      <thead><tr>${headers.map((h: string) => `<th class="px-3 py-2 text-left bg-dark-700 text-slate-300 border border-dark-600">${h}</th>`).join('')}</tr></thead>
      <tbody>${rows.map((row: string[]) => `<tr>${row.map((c: string) => `<td class="px-3 py-2 border border-dark-600 text-slate-400">${c}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>`;
  });

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-white mt-6 mb-2">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-white mt-8 mb-3">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-white mt-4 mb-4">$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Lists
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4 text-slate-300 list-disc list-inside">$1</li>');
  html = html.replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 text-slate-300 list-decimal list-inside">$2</li>');

  // Paragraphs
  html = html.replace(/^(?!<[a-z])((?!^\s*$).+)$/gm, (match) => {
    if (match.startsWith('<')) return match;
    return `<p class="text-slate-300 leading-relaxed mb-3">${match}</p>`;
  });

  return html;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function TheoryView({ content, onComplete, isCompleted }: TheoryViewProps) {
  return (
    <div className="max-w-3xl mx-auto py-8 px-6 slide-up">
      <div
        className="prose-custom"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
      />

      <div className="mt-10 flex justify-center">
        <button
          onClick={onComplete}
          className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${
            isCompleted
              ? 'bg-success/20 text-success border border-success/30'
              : 'bg-accent hover:bg-accent-light text-dark-900 glow-accent hover:scale-105'
          }`}
        >
          {isCompleted ? 'Completed!' : 'Mark as Complete'}
        </button>
      </div>
    </div>
  );
}
