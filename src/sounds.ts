import { getSettings } from "./settings.js";

const sounds: Record<string, HTMLAudioElement> = {};

/**
 * Load a sound.
 */
export async function loadSound(id: string, src: string) {
  return new Promise<void>((resolve, reject) => {
    const sound = new Audio(src);

    sound.addEventListener("canplaythrough", () => resolve(), { once: true });
    sound.addEventListener("error", (e) => reject(e), { once: true });

    sounds[id] = sound;
  });
}

/**
 * Play a sound.
 */
export function playSound(id: string, volume = 1, loop = false) {
  const settings = getSettings();
  const sound = sounds[id];
  sound.loop = loop;
  sound.volume = volume * settings.volume;
  sound.play();
}

/**
 * Stop a sound.
 */
export function stopSound(id: string) {
  const sound = sounds[id];
  sound.pause();
  sound.currentTime = 0;
}
