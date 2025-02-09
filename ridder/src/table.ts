export type Table<T> = Readonly<Array<T>>;

/**
 * Create a new table data structure.
 * A table is a fixed-size read-only array that is used to store a collection of items.
 * One can zero an object in the table to reuse it.
 */
export function table<T>(length: number, fill: (index: number) => T): Table<T> {
  return Array.from({ length }).map((_, index) => fill(index));
}
