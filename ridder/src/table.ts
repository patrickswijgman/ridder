export function table<T>(length: number, factory: (i: number) => T) {
  return Array.from({ length }, factory);
}
