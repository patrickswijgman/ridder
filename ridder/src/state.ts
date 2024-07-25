import { timer } from "./timer.js";

let last = 0;
let now = 0;
let frames = 0;

const framesTimer = timer();

/** The delta time as a scalar value since last frame. */
export let delta = 0;

/** The delta time in milliseconds since last frame. */
export let time = 0;

/** The current frames-per-second. */
export let fps = 0;

/**
 * Initialize state.
 */
export function setupState() {
  last = performance.now();
  now = performance.now();
}

/**
 * Update state for the current frame.
 * Returns true if the delta is within an acceptable range.
 */
export function updateState(frameId: number) {
  last = now;
  now = performance.now();

  delta = now / last;
  time = now - last;

  // If the delta time is too high, ignore the frame.
  if (time > 100) {
    cancelAnimationFrame(frameId);
  }

  frames++;

  if (framesTimer.tick(1000)) {
    fps = frames;
    frames = 0;
    framesTimer.reset();
  }
}
