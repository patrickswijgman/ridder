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
export function initState() {
  last = performance.now();
  now = performance.now();
}

/**
 * Update state for the current frame.
 */
export function updateState(elapsed: number) {
  last = now;

  // Cap the delta time at 100 milliseconds (10 fps). It could be that the tab
  // was frozen or minimized, which would cause a ridiculous amount of delta time.
  now = Math.min(elapsed, last + 100);

  delta = now / last;
  time = now - last;

  frames++;

  if (framesTimer.tick(1000)) {
    fps = frames;
    frames = 0;
    framesTimer.reset();
  }
}
