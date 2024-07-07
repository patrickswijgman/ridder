import { getCamera } from "./camera.js";
import { ctx, scale } from "./canvas.js";
import { point } from "./point.js";
import { toRadians } from "./utils.js";
import { vec } from "./vector.js";

export abstract class RenderObject {
  position = vec();
  scale = point(1, 1);
  scroll = point(1, 1);
  angle = 0;
  alpha = 1;
  color = "white";
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
