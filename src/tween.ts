import { EasingFunction } from "./easings.js";
import { time } from "./state.js";

export class Tween {
  elapsed = 0;
  value = 0;
  defaultValue = 0;

  /**
   * Advance the tween, updating its value between the start and end values over the given duration.
   * If `reverse` is true, consider using a "inOut" variant of the easing function.
   * Returns true if the tween has completed this frame, unless `loop` is true.
   */
  tween(
    start: number,
    end: number,
    duration: number,
    easing: EasingFunction,
    loop = false,
    reverse = false,
  ) {
    const totalDuration = reverse ? duration * 2 : duration;

    if (loop) {
      if (this.elapsed === totalDuration) {
        this.reset();
      }
    }

    if (totalDuration <= 0 || this.elapsed >= totalDuration) {
      return false;
    }

    this.elapsed += time;
    this.elapsed = Math.min(this.elapsed, totalDuration);

    this.value = start + (end - start) * easing(this.elapsed / duration);

    if (loop) {
      return false;
    }

    return this.elapsed === totalDuration;
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
