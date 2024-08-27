import { circle, doPolygonsIntersect, drawPolygonInstance, getEngineState, getMousePosition, getSettings, polygon, polygonFromCircle, rotatePolygon, run, vec } from "ridder";

const one = polygonFromCircle(0, 0, circle(0, 0, 30), 8);
const two = polygon(0, 0, [
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
    one.x = settings.width / 2;
    one.y = settings.height / 2;
  },

  update: () => {
    const { delta } = getEngineState();

    rotatePolygon(one, 1 * delta);

    const mouse = getMousePosition(true);
    two.x = mouse.x;
    two.y = mouse.y;

    drawPolygonInstance(one, doPolygonsIntersect(one, two) ? "red" : "white", false);
    drawPolygonInstance(two, "white", true);
  },
});
