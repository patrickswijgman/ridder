/**
 * Returns `true` when the two lines intersect.
 * [Source by Paul Bourke](https://paulbourke.net/geometry/pointlineplane/javascript.txt)
 * @param x1 - The x-coordinate of the first point of the first line.
 * @param y1 - The y-coordinate of the first point of the first line.
 * @param x2 - The x-coordinate of the second point of the first line.
 * @param y2 - The y-coordinate of the second point of the first line.
 * @param x3 - The x-coordinate of the first point of the second line.
 * @param y3 - The y-coordinate of the first point of the second line.
 * @param x4 - The x-coordinate of the second point of the second line.
 * @param y4 - The y-coordinate of the second point of the second line.
 */
export function doLinesIntersect(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number) {
  if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
    return false;
  }

  const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

  if (denominator === 0) {
    return false;
  }

  let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
  let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return false;
  }

  return true;
}
