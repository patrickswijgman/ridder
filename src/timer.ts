import { time } from "./state.js";

/**
 * A timer.
 */
export class Timer {
  elapsed = 0;

  /**
   * Advance the timer, returns true if it has reached its duration within this frame.
   */
  tick(duration: number) {
    if (duration <= 0 || this.elapsed >= duration) {
      return false;
    }

    this.elapsed += time;
    this.elapsed = Math.min(this.elapsed, duration);

    return this.elapsed === duration;
  }

  /**
   * Reset the timer back to zero.
   */
  reset() {
    this.elapsed = 0;
  }
}

/**
 * Create a new timer.
 */
export function timer() {
  return new Timer();
}
