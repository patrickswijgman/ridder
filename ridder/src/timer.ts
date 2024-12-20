import { getDeltaTime } from "./state.js";

export type Timer = {
  elapsed: number;
};

/**
 * Create a new timer data structure.
 */
export function timer(): Timer {
  return { elapsed: 0 };
}

/**
 * Advance the timer by the time since the last frame, returns `true` if the timer has reached the duration this frame.
 */
export function tickTimer(t: Timer, duration: number) {
  if (duration <= 0 || t.elapsed >= duration) {
    return false;
  }
  t.elapsed = Math.min(t.elapsed + getDeltaTime(), duration);
  return t.elapsed === duration;
}

/**
 * Reset the timer back to zero.
 */
export function resetTimer(t: Timer) {
  t.elapsed = 0;
}
