import {
  circle,
  delta,
  doPolygonsIntersect,
  drawPolygon,
  getMousePosition,
  getSettings,
  polygon,
  polygonFromCircle,
  rotatePolygon,
  run,
  vec,
} from "ridder";

// Polygon has some convenient functions to create common shapes such as a rectangle or circle.
const a = polygonFromCircle(0, 0, circle(0, 0, 30), 8);
// Or you can supply the points manually in clock-wise order, this creates a triangle for example.
// The points given are relative to the polygon's position.
const b = polygon(0, 0, [
  vec(-5, 5), // bottom left
  vec(0, -5), // top
  vec(5, 5), //  bottom right
]);

run({
  settings: {
    width: 160,
    height: 90,
  },

  setup: async () => {
    const settings = getSettings();

    a.x = settings.width / 2;
    a.y = settings.height / 2;
  },

  update: () => {
    const mouse = getMousePosition(true);
    b.x = mouse.x;
    b.y = mouse.y;

    rotatePolygon(a, 1 * delta);

    drawPolygon(a, doPolygonsIntersect(a, b) ? "red" : "white", false);
    drawPolygon(b, "white", true);
  },
});
