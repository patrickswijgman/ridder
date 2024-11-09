import { resetTimer, tickTimer, timer } from "./timer.js";

const TARGET_FRAME_TIME = 1000 / 60;

const framesTimer = timer();

let last = 0;
let now = 0;
let delta = 0;
let time = 0;
let elapsed = 0;
let frames = 0;
let fps = 0;

export function setupState() {
  last = performance.now();
  now = performance.now();
}

export function updateState() {
  last = now;
  now = performance.now();
  time = now - last;
  delta = time / TARGET_FRAME_TIME;

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

  elapsed += time;

  return true;
}

export function getDelta() {
  return delta;
}

export function getDeltaTime() {
  return time;
}

export function getFramePerSecond() {
  return fps;
}

export function getElapsedTime() {
  return elapsed;
}
