export function table<T>(length: number, factory: (i: number) => T): ReadonlyArray<T> {
  return Array.from({ length }, factory);
}
