import { EasingDictionary, easings } from "./easings.js";

/**
 * Return the value between {@link start} and {@link end} using the {@link easing} function, based on the elapsed time.
 *
 * @see {@link EasingDictionary} for the list of possible easing functions.
 *
 * @see {@link https://github.com/patrickswijgman/ridder/blob/main/examples/tween/index.ts} for an example.
 *
 */
export function tween(start: number, end: number, duration: number, easing: keyof EasingDictionary, elapsed: number) {
  return easings[easing](elapsed, start, end - start, duration);
}
