import { resetTimer, tickTimer, Timer, timer } from "./timer.js";
import { vec, Vector } from "./vector.js";

const TARGET_FRAME_TIME = 1000 / 60;

type State = {
  last: number;
  now: number;
  delta: number;
  time: number;
  frames: number;
  framesTimer: Timer;
  fps: number;
  scale: Vector;
  background: string;
  font: string;
};

const state: State = {
  last: 0,
  now: 0,
  delta: 0,
  time: 0,
  frames: 0,
  framesTimer: timer(),
  fps: 0,
  scale: vec(),
  background: "black",
  font: "16px sans-serif",
};

export function setupState() {
  state.last = performance.now();
  state.now = performance.now();
}

export function updateState() {
  state.last = state.now;
  state.now = performance.now();
  state.time = state.now - state.last;
  state.delta = state.time / TARGET_FRAME_TIME;

  // If the delta time is too high, ignore the frame.
  if (state.time > 100) {
    return false;
  }

  state.frames++;
  if (tickTimer(state.framesTimer, 1000)) {
    state.fps = state.frames;
    state.frames = 0;
    resetTimer(state.framesTimer);
  }

  return true;
}

export function getEngineState() {
  return state;
}
