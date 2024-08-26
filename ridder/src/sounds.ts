import { settings } from "./settings.js";

export type Sound = {
  audio: HTMLAudioElement;
  volume: number;
};

export const sounds: Record<string, Sound> = {};

export async function loadSound(id: string, src: string, volume = 1, stream = false) {
  return await new Promise<void>((resolve, reject) => {
    const audio = new Audio(src);
    const event = stream ? "canplay" : "canplaythrough";

    audio.addEventListener(
      event,
      () => {
        sounds[id] = { audio, volume };
        resolve();
      },
      { once: true },
    );

    audio.addEventListener(
      "error",
      (e) => {
        reject(e);
      },
      { once: true },
    );
  });
}

export function playSound(id: string, volume = 1, loop = false) {
  const sound = sounds[id];
  sound.audio.loop = loop;
  sound.audio.volume = volume * sound.volume * settings.volume;
  sound.audio.play();
}

export function stopSound(id: string) {
  const sound = sounds[id];
  sound.audio.pause();
  sound.audio.currentTime = 0;
}
