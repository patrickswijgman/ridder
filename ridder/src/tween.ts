import { EasingDictionary, easings } from "./easings.js";

export function tween(
  start: number,
  end: number,
  duration: number,
  elapsed: number,
  easing: keyof EasingDictionary,
  iterations = 1,
) {
  const totalDuration = duration * iterations;

  if (totalDuration <= 0 || elapsed >= totalDuration) {
    return end;
  }

  const easingFn = easings[easing];

  return easingFn(
    Math.min(elapsed, totalDuration),
    start,
    end - start,
    duration,
  );
}
