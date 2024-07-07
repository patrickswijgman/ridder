import { ctx } from "./canvas.js";
import { RenderObject } from "./render.js";
import { getSprite } from "./sprites.js";
import { getTexture } from "./textures.js";

export class Sprite extends RenderObject {
  id = "";

  draw() {
    if (!this.id) return;

    super.draw();

    const spr = getSprite(this.id);
    const tex = getTexture(spr.textureId);

    ctx.drawImage(
      tex,
      spr.x,
      spr.y,
      spr.w,
      spr.h,
      -spr.pivotX,
      -spr.pivotY,
      spr.w,
      spr.h,
    );
  }
}

/**
 * Create a Sprite instance, ready for drawing.
 */
export function sprite(id = "") {
  const obj = new Sprite();

  obj.id = id;

  return obj;
}
