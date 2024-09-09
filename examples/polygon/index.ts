import { circle, doPolygonsIntersect, drawPolygonInstance, getDelta, getHeight, getMousePosition, getWidth, polygon, polygonFromCircle, rotatePolygon, run, vec } from "ridder";

const one = polygonFromCircle(0, 0, circle(0, 0, 30), 8);
const two = polygon(0, 0, [
  vec(-5, 5), // bottom left
  vec(0, -5), // top
  vec(5, 5), //  bottom right
]);

run({
  width: 160,
  height: 90,

  setup: async () => {
    one.x = getWidth() / 2;
    one.y = getHeight() / 2;
  },

  update: () => {
    rotatePolygon(one, 1 * getDelta());

    const mouse = getMousePosition(true);
    two.x = mouse.x;
    two.y = mouse.y;
  },

  render: () => {
    drawPolygonInstance(one, doPolygonsIntersect(one, two) ? "red" : "white", false);
    drawPolygonInstance(two, "white", true);
  },
});
