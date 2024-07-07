import { getCamera } from "./camera.js";
import { ctx, scale } from "./canvas.js";
import { point } from "./point.js";
import { toRadians } from "./utils.js";
import { vec } from "./vector.js";

export abstract class RenderObject {
  /** The position of this object. */
  position = vec();
  /** The scale factor when drawing this object. */
  scale = point(1, 1);
  /** The camera scrolling factor, e.g. set x=0 and y=0 for UI objects. */
  scroll = point(1, 1);
  /** The angle in degrees when drawing this object. */
  angle = 0;
  /** The alpha (opacity) value when drawing this object (0.0 ~ 1.0). */
  alpha = 1;
  /** The color when drawing this object, can be a word e.g. "blue" or a hex e.g. "#0000ff". */
  color = "white";
  /** When drawing this object; whether to fill or stroke the shape. */
  fill = false;

  draw() {
    const cam = getCamera();
    const camX = -cam.x * this.scroll.x;
    const camY = -cam.y * this.scroll.y;

    ctx.setTransform(scale.x, 0, 0, scale.y, 0, 0);
    ctx.translate(camX, camY);
    ctx.translate(this.x, this.y);
    ctx.scale(this.scale.x, this.scale.y);
    ctx.rotate(toRadians(this.angle));
    ctx.globalAlpha = this.alpha;
  }

  set x(x: number) {
    this.position.x = x;
  }
  get x() {
    return this.position.x;
  }

  set y(y: number) {
    this.position.y = y;
  }
  get y() {
    return this.position.y;
  }
}
