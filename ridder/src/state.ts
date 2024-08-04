import { resetTimer, tickTimer, timer } from "./timer.js";

let last = 0;
let now = 0;

let frames = 0;

const framesTimer = timer();

export let delta = 0;
export let time = 0;
export let fps = 0;

export function setupState() {
  last = performance.now();
  now = performance.now();
}

export function updateState() {
  last = now;
  now = performance.now();

  time = now - last;
  delta = time / (1000 / 60);

  // If the delta time is too high, ignore the frame.
  if (time > 100) {
    return false;
  }

  frames++;

  if (tickTimer(framesTimer, 1000)) {
    fps = frames;
    frames = 0;
    resetTimer(framesTimer);
  }

  return true;
}
