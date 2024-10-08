const sounds: Record<string, HTMLAudioElement> = {};

let volume = 1;

export async function loadSound(id: string, url: string, stream = false) {
  return await new Promise<void>((resolve, reject) => {
    const audio = new Audio(url);
    const event = stream ? "canplay" : "canplaythrough";

    audio.addEventListener(
      event,
      () => {
        sounds[id] = audio;
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

export function playSound(id: string, loop = false) {
  const sound = sounds[id];
  sound.loop = loop;
  sound.volume = volume;
  sound.play();
}

export function stopSound(id: string) {
  const sound = sounds[id];
  sound.pause();
  sound.currentTime = 0;
}

export function getSound(id: string) {
  return sounds[id];
}

export function setVolume(value: number) {
  volume = value;

  for (const id in sounds) {
    const sound = sounds[id];
    sound.volume = volume;
  }
}

export function getVolume() {
  return volume;
}
