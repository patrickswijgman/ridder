import { getSettings } from "./settings.js";

export type Sound = HTMLAudioElement;

const sounds: Record<string, Sound> = {};

export async function loadSound(id: string, src: string, isStream = false) {
  return await new Promise<void>((resolve, reject) => {
    const sound = new Audio(src);
    const event = isStream ? "canplay" : "canplaythrough";

    sound.addEventListener(
      event,
      () => {
        sounds[id] = sound;
        resolve();
      },
      { once: true },
    );

    sound.addEventListener(
      "error",
      (e) => {
        reject(e);
      },
      { once: true },
    );
  });
}

export function playSound(id: string, volume = 1, loop = false) {
  const settings = getSettings();
  const sound = sounds[id];
  sound.loop = loop;
  sound.volume = volume * settings.volume;
  sound.play();
}

export function stopSound(id: string) {
  const sound = sounds[id];
  sound.pause();
  sound.currentTime = 0;
}

export function getSound(id: string): Readonly<Sound> {
  return sounds[id];
}
