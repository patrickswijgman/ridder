import { vec } from "./vector.js";

export const VECTOR_ZERO = Object.freeze(vec(0, 0));
export const VECTOR_UP = Object.freeze(vec(0, -1));
export const VECTOR_DOWN = Object.freeze(vec(0, 1));
export const VECTOR_LEFT = Object.freeze(vec(-1, 0));
export const VECTOR_RIGHT = Object.freeze(vec(1, 0));

export enum InputCode {
  NONE = "",

  KEY_A = "KeyA",
  KEY_B = "KeyB",
  KEY_C = "KeyC",
  KEY_D = "KeyD",
  KEY_E = "KeyE",
  KEY_F = "KeyF",
  KEY_G = "KeyG",
  KEY_H = "KeyH",
  KEY_I = "KeyI",
  KEY_J = "KeyJ",
  KEY_K = "KeyK",
  KEY_L = "KeyL",
  KEY_M = "KeyM",
  KEY_N = "KeyN",
  KEY_O = "KeyO",
  KEY_P = "KeyP",
  KEY_Q = "KeyQ",
  KEY_R = "KeyR",
  KEY_S = "KeyS",
  KEY_T = "KeyT",
  KEY_U = "KeyU",
  KEY_V = "KeyV",
  KEY_W = "KeyW",
  KEY_X = "KeyX",
  KEY_Y = "KeyY",
  KEY_Z = "KeyZ",

  KEY_1 = "Digit1",
  KEY_2 = "Digit2",
  KEY_3 = "Digit3",
  KEY_4 = "Digit4",
  KEY_5 = "Digit5",
  KEY_6 = "Digit6",
  KEY_7 = "Digit7",
  KEY_8 = "Digit8",
  KEY_9 = "Digit9",
  KEY_0 = "Digit0",

  KEY_F1 = "F1",
  KEY_F2 = "F2",
  KEY_F3 = "F3",
  KEY_F4 = "F4",
  KEY_F5 = "F5",
  KEY_F6 = "F6",
  KEY_F7 = "F7",
  KEY_F8 = "F8",
  KEY_F9 = "F9",
  KEY_F10 = "F10",
  KEY_F11 = "F11",
  KEY_F12 = "F12",

  KEY_TAB = "Tab",
  KEY_ESCAPE = "Escape",
  KEY_SPACE = "Space",
  KEY_ENTER = "Enter",
  KEY_BACKSPACE = "Backspace",

  KEY_SHIFT_LEFT = "ShiftLeft",
  KEY_SHIFT_RIGHT = "ShiftRight",

  KEY_CTRL_LEFT = "ControlLeft",
  KEY_CTRL_RIGHT = "ControlRight",

  KEY_UP = "ArrowUp",
  KEY_DOWN = "ArrowDown",
  KEY_RIGHT = "ArrowRight",
  KEY_LEFT = "ArrowLeft",

  MOUSE_LEFT = "MouseLeft",
  MOUSE_RIGHT = "MouseRight",
  MOUSE_MIDDLE = "MouseMiddle",
}
