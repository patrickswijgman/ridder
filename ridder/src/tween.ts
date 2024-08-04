import { EasingDictionary, easings } from "./easings.js";

export function tween(
  start: number,
  end: number,
  duration: number,
  elapsed: number,
  easing: keyof EasingDictionary,
) {
  return easings[easing](elapsed, start, end - start, duration);
}
