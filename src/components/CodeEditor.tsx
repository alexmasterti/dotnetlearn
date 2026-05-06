import { useEffect, useRef } from 'react';
import { EditorView, keymap, gutter, GutterMarker, Decoration } from '@codemirror/view';
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
}

// JavaScript/TypeScript mode is the closest sane match for C# syntax highlighting
// in the browser without pulling a dedicated C# language pack.
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
    if (line === undefined) {
      // No effect this transaction; just adjust positions through tr.changes
      return value.map(tr.changes);
    }
    if (line === null) return Decoration.none;
    if (line < 1 || line > tr.state.doc.lines) return Decoration.none;
    const lineInfo = tr.state.doc.line(line);
    return Decoration.set([
      Decoration.line({ class: 'cm-debug-line' }).range(lineInfo.from),
    ]);
  },
  provide: (f) => EditorView.decorations.from(f),
});

export function CodeEditor({
  value,
  onChange,
  breakpoints,
  onToggleBreakpoint,
  currentLine,
}: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  // Latest onToggle in a ref so the gutter handler reads the current callback
  // without re-creating the editor on every parent render.
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
        const ranges = [] as { from: number; to: number; value: BreakpointMarker }[];
        const lineNumbers = Array.from(bps).sort((a, b) => a - b);
        for (const ln of lineNumbers) {
          if (ln >= 1 && ln <= view.state.doc.lines) {
            const info = view.state.doc.line(ln);
            ranges.push({ from: info.from, to: info.from, value: breakpointMarker });
          }
        }
        return RangeSet.of(ranges.map((r) => breakpointMarker.range(r.from)));
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
        breakpointGutter,
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
        }),
      ],
    });

    const view = new EditorView({
      state,
      parent: containerRef.current,
    });

    viewRef.current = view;
    // Seed the field state from props
    if (breakpoints && breakpoints.size > 0) {
      view.dispatch({ effects: setBreakpoints.of(breakpoints) });
    }
    if (currentLine != null) {
      view.dispatch({ effects: setCurrentLine.of(currentLine) });
    }

    return () => {
      view.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync external value
  useEffect(() => {
    const view = viewRef.current;
    if (view && view.state.doc.toString() !== value) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: value },
      });
    }
  }, [value]);

  // Sync breakpoints
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({ effects: setBreakpoints.of(breakpoints ?? new Set<number>()) });
  }, [breakpoints]);

  // Sync current line
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    view.dispatch({ effects: setCurrentLine.of(currentLine ?? null) });
  }, [currentLine]);

  return (
    <div
      ref={containerRef}
      className="h-full rounded-lg overflow-hidden border border-dark-600"
    />
  );
}
