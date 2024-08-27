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

export function uuid() {
  return crypto.randomUUID();
}

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function roll(chance: number) {
  return random(1, 100) <= chance * 100;
}

export function pick<T>(a: Array<T>) {
  return a[random(0, a.length - 1)];
}

export function shuffle<T>(a: T[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = random(0, i);
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

export function repeat(x: number, callback: (x: number) => void) {
  for (let i = 0; i < x; i++) {
    callback(i);
  }
}
