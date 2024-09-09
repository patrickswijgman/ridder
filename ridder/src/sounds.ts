export type Sound = {
  audio: HTMLAudioElement;
  volume: number;
};

const sounds: Record<string, Sound> = {};

let volume = 1;

export async function loadSound(id: string, url: string, volume = 1, stream = false) {
  return await new Promise<void>((resolve, reject) => {
    const audio = new Audio(url);
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
  sound.audio.volume = volume * sound.volume;
  sound.audio.play();
}

export function stopSound(id: string) {
  const sound = sounds[id];
  sound.audio.pause();
  sound.audio.currentTime = 0;
}

export function getSound(id: string) {
  return sounds[id];
}

export function setVolume(value: number) {
  volume = value;

  for (const id in sounds) {
    const sound = sounds[id];
    sound.audio.volume = volume * sound.volume;
  }
}

export function getVolume() {
  return volume;
}
