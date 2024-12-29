export type Grid<T> = Array<Array<T>>;

/**
 * Create a new grid data structure.
 * @param width - The width of the 2D array.
 * @param height - The height of the 2D array.
 * @param fill - The function to fill each cell in the grid.
 */
export function grid<T>(width: number, height: number, fill: (x: number, y: number) => T): Grid<T> {
  return Array.from({ length: height }, (_, y: number) => {
    return Array.from({ length: width }, (_, x: number) => {
      return fill(x, y);
    });
  });
}

/**
 * Returns true if the width and height of the grid is larger than zero.
 */
export function isGridValid<T>(grid: Grid<T>) {
  return grid.length > 0 && grid[0].length > 0;
}

/**
 * Returns true if the given position is within the grid's width and height.
 */
export function isInsideGridBounds<T>(grid: Grid<T>, x: number, y: number) {
  return x >= 0 && x < getGridWidth(grid) && y >= 0 && y < getGridHeight(grid);
}

/**
 * Set a cell in the grid to a value.
 */
export function setGridValue<T>(grid: Grid<T>, x: number, y: number, value: T) {
  grid[y][x] = value;
}

/**
 * Returns a cell value from the grid.
 */
export function getGridValue<T>(grid: Grid<T>, x: number, y: number) {
  return grid[y][x];
}

/**
 * Returns the width of the grid.
 */
export function getGridWidth<T>(grid: Grid<T>) {
  return grid.length ? grid[0].length : 0;
}

/**
 * Returns the height of the grid.
 */
export function getGridHeight<T>(grid: Grid<T>) {
  return grid.length;
}
