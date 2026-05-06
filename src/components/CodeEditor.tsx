import { useEffect, useRef } from 'react';
import { EditorView, keymap, gutter, GutterMarker, Decoration, hoverTooltip } from '@codemirror/view';
import type { DecorationSet } from '@codemirror/view';
import { EditorState, StateEffect, StateField, RangeSet } from '@codemirror/state';
import { basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  /** Set of 1-based line numbers that have breakpoints. */
  breakpoints?: Set<number>;
  /** Called when the user clicks the gutter on a line to toggle a breakpoint. */
  onToggleBreakpoint?: (line: number) => void;
  /** 1-based line number to highlight as the currently paused line, or null. */
  currentLine?: number | null;
  /**
   * Variable name → current value, used to populate hover tooltips while
   * paused in the debugger. Only consulted when `currentLine` is non-null.
   */
  variables?: Map<string, string> | null;
}

const csharpLang = javascript({ typescript: true });

// === Breakpoint gutter ===

class BreakpointMarker extends GutterMarker {
  toDOM() {
    const dot = document.createElement('div');
    dot.className = 'cm-breakpoint';
    return dot;
  }
}
const breakpointMarker = new BreakpointMarker();

const setBreakpoints = StateEffect.define<Set<number>>();
const breakpointsField = StateField.define<Set<number>>({
  create: () => new Set<number>(),
  update(value, tr) {
    let next = value;
    for (const e of tr.effects) {
      if (e.is(setBreakpoints)) next = e.value;
    }
    return next;
  },
});

// === Current-line highlight ===

const setCurrentLine = StateEffect.define<number | null>();
const currentLineField = StateField.define<DecorationSet>({
  create: () => Decoration.none,
  update(value, tr) {
    let line: number | null | undefined;
    for (const e of tr.effects) {
      if (e.is(setCurrentLine)) line = e.value;
    }
    if (line === undefined) return value.map(tr.changes);
    if (line === null) return Decoration.none;
    if (line < 1 || line > tr.state.doc.lines) return Decoration.none;
    const lineInfo = tr.state.doc.line(line);
    return Decoration.set([
      Decoration.line({ class: 'cm-debug-line' }).range(lineInfo.from),
    ]);
  },
  provide: (f) => EditorView.decorations.from(f),
});

// === Variables for hover tooltip ===

const setVariables = StateEffect.define<Map<string, string> | null>();
const variablesField = StateField.define<Map<string, string> | null>({
  create: () => null,
  update(value, tr) {
    let next: Map<string, string> | null | undefined;
    for (const e of tr.effects) {
      if (e.is(setVariables)) next = e.value;
    }
    return next === undefined ? value : next;
  },
});

const wordHover = hoverTooltip((view, pos) => {
  const vars = view.state.field(variablesField, false);
  if (!vars || vars.size === 0) return null;
  const lineObj = view.state.doc.lineAt(pos);
  const text = lineObj.text;
  const offset = pos - lineObj.from;
  const isWord = (ch: string) => /[A-Za-z0-9_]/.test(ch);
  if (offset < 0 || offset >= text.length || !isWord(text[offset])) return null;
  let start = offset;
  let end = offset;
  while (start > 0 && isWord(text[start - 1])) start--;
  while (end < text.length && isWord(text[end])) end++;
  const word = text.slice(start, end);
  if (!word || /^\d/.test(word)) return null;
  const value = vars.get(word);
  if (value === undefined) return null;
  return {
    pos: lineObj.from + start,
    end: lineObj.from + end,
    above: true,
    create() {
      const el = document.createElement('div');
      el.className = 'cm-var-tooltip';
      el.innerHTML = `<span class="cm-var-tooltip-name">${word}</span><span class="cm-var-tooltip-eq"> = </span><span class="cm-var-tooltip-val">${escapeHtml(value)}</span>`;
      return { dom: el };
    },
  };
});

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function CodeEditor({
  value,
  onChange,
  breakpoints,
  onToggleBreakpoint,
  currentLine,
  variables,
}: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onToggleRef = useRef(onToggleBreakpoint);
  useEffect(() => {
    onToggleRef.current = onToggleBreakpoint;
  }, [onToggleBreakpoint]);

  useEffect(() => {
    if (!containerRef.current) return;

    const breakpointGutter = gutter({
      class: 'cm-breakpoint-gutter',
      markers: (view) => {
        const bps = view.state.field(breakpointsField);
        if (bps.size === 0) return RangeSet.empty;
        const lineNumbers = Array.from(bps).sort((a, b) => a - b);
        const ranges = [];
        for (const ln of lineNumbers) {
          if (ln >= 1 && ln <= view.state.doc.lines) {
            const info = view.state.doc.line(ln);
            ranges.push(breakpointMarker.range(info.from));
          }
        }
        return RangeSet.of(ranges);
      },
      domEventHandlers: {
        mousedown(view, line) {
          const lineNo = view.state.doc.lineAt(line.from).number;
          onToggleRef.current?.(lineNo);
          return true;
        },
      },
    });

    const state = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        csharpLang,
        oneDark,
        keymap.of([...defaultKeymap, indentWithTab]),
        breakpointsField,
        currentLineField,
        variablesField,
        breakpointGutter,
        wordHover,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChange(update.state.doc.toString());
          }
        }),
        EditorView.theme({
          '&': { height: '100%', backgroundColor: '#1a1d27' },
          '.cm-content': { padding: '12px 0' },
          '.cm-gutters': { backgroundColor: '#1a1d27', border: 'none' },
          '.cm-breakpoint-gutter': {
            width: '14px',
            cursor: 'pointer',
            paddingLeft: '4px',
          },
          '.cm-breakpoint-gutter:hover': { backgroundColor: '#242837' },
          '.cm-breakpoint': {
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#ef4444',
            marginTop: '4px',
            boxShadow: '0 0 4px rgba(239, 68, 68, 0.6)',
          },
          '.cm-debug-line': {
            backgroundColor: 'rgba(124, 58, 237, 0.18) !important',
            outline: '1px solid rgba(124, 58, 237, 0.45)',
          },
          '.cm-tooltip.cm-tooltip-hover': {
            backgroundColor: '#0f1117',
            border: '1px solid rgba(124, 58, 237, 0.6)',
            borderRadius: '6px',
            padding: '6px 10px',
            fontSize: '12px',
            fontFamily: 'monospace',
            color: '#e5e7eb',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
          },
          '.cm-var-tooltip-name': { color: '#6ee7b7' },
          '.cm-var-tooltip-eq': { color: '#94a3b8' },
          '.cm-var-tooltip-val': { color: '#e5e7eb' },
        }),
      ],
    });

    const view = new EditorView({
      state,
      parent: containerRef.current,
    });

    viewRef.current = view;
    if (breakpoints && breakpoints.size > 0) {
      view.dispatch({ effects: setBreakpoints.of(breakpoints) });
    }
    if (currentLine != null) {
      view.dispatch({ effects: setCurrentLine.of(currentLine) });
    }
    if (variables) {
      view.dispatch({ effects: setVariables.of(variables) });
    }

    return () => {
      view.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (view && view.state.doc.toString() !== value) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: value },
      });
    }
  }, [value]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({ effects: setBreakpoints.of(breakpoints ?? new Set<number>()) });
  }, [breakpoints]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({ effects: setCurrentLine.of(currentLine ?? null) });
  }, [currentLine]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({ effects: setVariables.of(variables ?? null) });
  }, [variables]);

  return (
    <div
      ref={containerRef}
      className="h-full rounded-lg overflow-hidden border border-dark-600"
    />
  );
}
