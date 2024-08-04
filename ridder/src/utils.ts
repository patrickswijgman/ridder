export function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

export function toDegrees(radians: number) {
  return (radians * 180) / Math.PI;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function getDistance(x1: number, y1: number, x2: number, y2: number) {
  const x = x1 - x2;
  const y = y1 - y2;
  return Math.sqrt(x * x + y * y);
}

export function getAngle(x1: number, y1: number, x2: number, y2: number) {
  return toDegrees(Math.atan2(y2 - y1, x2 - x1));
}

export function randomId() {
  return crypto.randomUUID();
}

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function chance(x: number) {
  return randomInt(0, 100) / 100 < x;
}

export function pick<T>(a: Array<T>) {
  return a[randomInt(0, a.length)];
}

export function shuffle<T>(a: T[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = randomInt(0, i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
}

export function remove<T>(a: Array<T>, e: T) {
  const index = a.indexOf(e);

  if (index !== -1) {
    a.splice(index, 1);
  }

  return a;
}
