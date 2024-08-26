export type Settings = {
  width: number;
  height: number;
  volume: number;
  background: string;
  cameraSmoothing: number;
};

export const settings: Settings = {
  width: 800,
  height: 600,
  volume: 1,
  background: "black",
  cameraSmoothing: 1,
};

export function setSettings(overwrite: Partial<Settings>) {
  Object.assign(settings, overwrite);
}
