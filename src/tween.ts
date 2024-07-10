import { EasingDictionary, easings } from "./easings.js";
import { time } from "./state.js";

export class Tween {
  elapsed = 0;
  value = 0;
  defaultValue = 0;

  /**
   * Advance the tween, updating its value between the start and end values over the given duration.
   * Returns true if the tween has completed this frame, unless iterations is Infinity.
   */
  tween(
    start: number,
    end: number,
    duration: number,
    easing: keyof EasingDictionary,
    iterations = 1,
  ) {
    const totalDuration = duration * iterations;

    if (totalDuration <= 0 || this.elapsed >= totalDuration) {
      return false;
    }

    const easingFn = easings[easing];

    this.elapsed += time;
    this.elapsed = Math.min(this.elapsed, totalDuration);
    this.value = easingFn(this.elapsed, start, end - start, duration);

    return this.elapsed === duration;
  }

  /**
   * Reset the elapsed time of this tween back to zero and the value back to its default value.
   */
  reset() {
    this.elapsed = 0;
    this.value = this.defaultValue;
  }
}

/**
 * Create a tween that can be used for animations.
 */
export function tween(defaultValue = 0) {
  const t = new Tween();

  t.defaultValue = defaultValue;
  t.value = defaultValue;

  return t;
}
