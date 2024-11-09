import { EasingDictionary, easings } from "./easings.js";

export function tween(start: number, end: number, duration: number, easing: keyof EasingDictionary, elapsed: number) {
  return easings[easing](elapsed, start, end - start, duration);
}
