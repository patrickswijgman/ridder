const sounds: Array<HTMLAudioElement> = [];

let volume = 1;

/**
 * Load a sound into the cache.
 * @param id - The ID for the sound in the cache.
 * @param url - The url to the `.mp3`, `.wav`, or `.ogg` file.
 * @param stream - Whether or not the sound should be streamed, e.g. for large files such as music.
 */
export async function loadSound(id: number, url: string, stream = false) {
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

/**
 * Play a sound from the cache.
 */
export function playSound(id: number, loop = false) {
  const sound = sounds[id];
  sound.loop = loop;
  sound.volume = volume;
  sound.play();
}

/**
 * Stop a currently playing sound.
 */
export function stopSound(id: number) {
  const sound = sounds[id];
  sound.pause();
  sound.currentTime = 0;
}

/**
 * Get a sound from the cache.
 */
export function getSound(id: number) {
  return sounds[id];
}

/**
 * Set the global audio volume.
 */
export function setVolume(value: number) {
  volume = value;

  for (const id in sounds) {
    const sound = sounds[id];
    sound.volume = volume;
  }
}

/**
 * Get the global audio volume.
 */
export function getVolume() {
  return volume;
}
