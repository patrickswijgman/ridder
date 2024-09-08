export type Settings = {
  width: number;
  height: number;
  volume: number;
  cameraSmoothing: number;
};

const settings: Settings = {
  width: 800,
  height: 600,
  volume: 1,
  cameraSmoothing: 1,
};

export function setSettings(overwrite: Partial<Settings>) {
  Object.assign(settings, overwrite);
}

export function getSettings() {
  return settings;
}
