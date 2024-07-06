import { EasingFunction } from "./easings.js";
import { time } from "./state.js";

export class Tween {
  elapsed = 0;
  value = 0;

  constructor(public defaultValue: number) {
    this.value = defaultValue;
  }

  /**
   * Advance the tween, updating its value between the start and end values over the given duration.
   *
   * Iterations is the amount of times this tween goes back and forth, to run this tween only once set iterations to one.
   *
   * If iterations is higher than one, consider the use of an "inOut" easing function e.g. "easeInOutSine" to gracefully
   * let this tween go back and forth.
   */
  tween(
    start: number,
    end: number,
    duration: number,
    iterations: number,
    easing: EasingFunction,
  ) {
    const totalDuration = duration * iterations;

    this.elapsed += time;
    this.elapsed = Math.min(this.elapsed, totalDuration);

    this.value = start + (end - start) * easing(this.elapsed / duration);
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
  return new Tween(defaultValue);
}
