import { time } from "./state.js";

export type Timer = {
  elapsed: number;
};

export function timer(): Timer {
  return { elapsed: 0 };
}

export function tickTimer(t: Timer, duration: number) {
  if (duration <= 0 || t.elapsed >= duration) {
    return false;
  }
  t.elapsed = Math.min(t.elapsed + time, duration);
  return t.elapsed === duration;
}

export function resetTimer(t: Timer) {
  t.elapsed = 0;
}
