import { doPolygonsIntersect, drawPolygonInstance, getDelta, getHeight, getMousePosition, getWidth, polygon, polygonFromCircle, run, setPolygonAngle, vec } from "ridder";

const one = polygonFromCircle(0, 0, 0, 0, 30, 8);
const two = polygon(0, 0, [
  vec(-5, 5), // bottom left
  vec(0, -5), // top
  vec(5, 5), //  bottom right
]);

let angle = 0;

run({
  width: 160,
  height: 90,

  setup: async () => {
    one.x = getWidth() / 2;
    one.y = getHeight() / 2;
  },

  update: () => {
    angle += 1 * getDelta();
    setPolygonAngle(one, angle);

    const mouse = getMousePosition(false);
    two.x = mouse.x;
    two.y = mouse.y;

    drawPolygonInstance(one, doPolygonsIntersect(one, two) ? "red" : "white", false);
    drawPolygonInstance(two, "white", true);
  },
});
