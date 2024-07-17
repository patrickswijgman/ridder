import { Vec, vec } from "./vector.js";

export type Settings = {
  /** The width of the game screen (default 800). */
  width: number;
  /** The height of the game screen (default 600). */
  height: number;
  /** The overall sound level (default 1). */
  volume: number;
  /** The background color of the canvas (default "black"). */
  background: string;
  /** The speed factor (from 0.0 until 1.0) of the camera when it follows its target (default 1.0). */
  cameraSmoothing: number;
  /** The gravitational force vector, e.g. set the Y value to a positive number for a platformer. */
  gravity: Vec;
  /** The maximum amount of gravitational force. */
  gravityMax: number;
  /** Show debugging information like frames-per-second (default false). */
  debug: boolean;
};

/**
 * The global settings.
 */
const settings: Settings = {
  width: 800,
  height: 600,
  volume: 1,
  background: "black",
  cameraSmoothing: 1,
  gravity: vec(),
  gravityMax: Number.MAX_SAFE_INTEGER,
  debug: false,
};

/**
 * Overwrite current settings.
 */
export function setSettings(overwrite: Partial<Settings>) {
  Object.assign(settings, overwrite);
}

/**
 * Get the current settings.
 */
export function getSettings(): Readonly<Settings> {
  return settings;
}
