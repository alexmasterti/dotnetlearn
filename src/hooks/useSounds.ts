import { useCallback, useRef } from 'react';

const audioCtxRef = { current: null as AudioContext | null };

function getCtx() {
  if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
  return audioCtxRef.current;
}

function playTone(freq: number, duration: number, type: OscillatorType = 'sine', vol = 0.15) {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.value = vol;
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

export function useSounds() {
  const enabled = useRef(localStorage.getItem('dotnetlearn_sounds') !== 'off');

  const setEnabled = useCallback((on: boolean) => {
    enabled.current = on;
    localStorage.setItem('dotnetlearn_sounds', on ? 'on' : 'off');
  }, []);

  const correct = useCallback(() => {
    if (!enabled.current) return;
    playTone(523, 0.12);
    setTimeout(() => playTone(659, 0.12), 100);
    setTimeout(() => playTone(784, 0.2), 200);
  }, []);

  const wrong = useCallback(() => {
    if (!enabled.current) return;
    playTone(330, 0.2, 'square', 0.08);
    setTimeout(() => playTone(262, 0.3, 'square', 0.08), 150);
  }, []);

  const levelUp = useCallback(() => {
    if (!enabled.current) return;
    [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => playTone(f, 0.2), i * 120));
  }, []);

  const click = useCallback(() => {
    if (!enabled.current) return;
    playTone(800, 0.05, 'sine', 0.05);
  }, []);

  const complete = useCallback(() => {
    if (!enabled.current) return;
    [523, 659, 784, 1047, 1319].forEach((f, i) => setTimeout(() => playTone(f, 0.15), i * 80));
  }, []);

  // eslint-disable-next-line react-hooks/refs
  return { correct, wrong, levelUp, click, complete, enabled: enabled.current, setEnabled };
}
