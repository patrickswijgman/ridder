import { EasingDictionary, easings } from "./easings.js";
import { Timer } from "./timer.js";

export function tween(
  start: number,
  end: number,
  duration: number,
  easing: keyof EasingDictionary,
  timer: Timer,
) {
  return easings[easing](timer.elapsed, start, end - start, duration);
}
