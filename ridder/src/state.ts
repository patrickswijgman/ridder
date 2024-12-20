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

/**
 * Set the initial time.
 */
export function setupState() {
  last = performance.now();
  now = performance.now();
}

/**
 * Update the current state of the game loop.
 */
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

/**
 * The scalar value of the time between the last frame and the current frame.
 * This value is calculated based on the desired 60 frames per second.
 *
 * Using this value will make sure that your game runs at the same speed on all frame rates.
 *
 * NOTE - Use this for physics or movement. For animations (tweens) or timers, use {@link getDeltaTime} instead.
 */
export function getDelta() {
  return delta;
}

/**
 * The time in milliseconds between the last frame and the current frame.
 *
 * NOTE - Use this for animations (tweens) or timers. For physics or movement, use {@link getDelta} instead.
 */
export function getDeltaTime() {
  return time;
}

/**
 * Get the current frames per second.
 */
export function getFramePerSecond() {
  return fps;
}

/**
 * Get the elapsed time in milliseconds since the game started.
 */
export function getElapsedTime() {
  return elapsed;
}
