import { EasingFunction } from "./easings.js";

/**
 * Tween a value between a start and end value.
 */
export function tween(
  start: number,
  end: number,
  duration: number,
  elapsed: number,
  easing: EasingFunction,
) {
  return start + (end - start) * easing(elapsed / duration);
}
