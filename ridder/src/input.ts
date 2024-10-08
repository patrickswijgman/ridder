import { getCameraPosition } from "./camera.js";
import { canvas, scale } from "./canvas.js";
import { InputCode } from "./consts.js";
import { vec } from "./vector.js";

const inputsDown: Record<string, boolean> = {};
const inputsPressed: Record<string, boolean> = {};
const inputsReleased: Record<string, boolean> = {};

const mousePosition = vec();
const mouseWorldPosition = vec();

export function setupInput() {
  window.addEventListener("keydown", (event) => {
    event.preventDefault();
    onDown(event.code);
  });

  window.addEventListener("keyup", (event) => {
    event.preventDefault();
    onUp(event.code);
  });

  window.addEventListener("focus", () => {
    resetAllInputs();
  });

  window.addEventListener("blur", () => {
    resetAllInputs();
  });

  canvas.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    onPointerEvent(canvas, event);
    const code = getMouseButtonCode(event.button);
    if (code) {
      onDown(code);
    }
  });

  canvas.addEventListener("pointerup", (event) => {
    event.preventDefault();
    onPointerEvent(canvas, event);
    const code = getMouseButtonCode(event.button);
    if (code) {
      onUp(code);
    }
  });

  canvas.addEventListener("pointermove", (event) => {
    event.preventDefault();
    onPointerEvent(canvas, event);
  });

  canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
}

function onDown(code: string) {
  if (inputsDown[code]) return;
  inputsDown[code] = true;
  inputsPressed[code] = true;
  inputsReleased[code] = false;
}

function onUp(code: string) {
  inputsDown[code] = false;
  inputsPressed[code] = false;
  inputsReleased[code] = true;
}

function onPointerEvent(target: HTMLElement, event: PointerEvent) {
  const offset = target.getBoundingClientRect();
  mousePosition.x = event.clientX / scale.x - offset.x;
  mousePosition.y = event.clientY / scale.y - offset.y;
}

function getMouseButtonCode(button: number): InputCode | null {
  switch (button) {
    case 0:
      return InputCode.MOUSE_LEFT;
    case 1:
      return InputCode.MOUSE_MIDDLE;
    case 2:
      return InputCode.MOUSE_RIGHT;
    default:
      return null;
  }
}

export function updateMousePosition() {
  const camera = getCameraPosition();
  mouseWorldPosition.x = mousePosition.x + camera.x;
  mouseWorldPosition.y = mousePosition.y + camera.y;
}

export function resetInputs() {
  for (const key in inputsPressed) {
    inputsPressed[key] = false;
  }
  for (const key in inputsReleased) {
    inputsReleased[key] = false;
  }
}

export function resetAllInputs() {
  for (const key in inputsDown) {
    inputsDown[key] = false;
  }
  for (const key in inputsPressed) {
    inputsPressed[key] = false;
  }
  for (const key in inputsReleased) {
    inputsReleased[key] = false;
  }
}

export function isInputPressed(code: InputCode) {
  return !!inputsPressed[code];
}

export function isInputDown(code: InputCode) {
  return !!inputsDown[code];
}

export function isInputReleased(code: InputCode) {
  return !!inputsReleased[code];
}

export function consumeInputPressed(code: InputCode) {
  inputsPressed[code] = false;
}

export function consumeInputDown(code: InputCode) {
  inputsDown[code] = false;
}

export function consumeInputReleased(code: InputCode) {
  inputsReleased[code] = false;
}

export function getMousePosition(inWorld: boolean) {
  return inWorld ? mouseWorldPosition : mousePosition;
}
