import { ctx } from "./canvas.js";
import { RenderObject } from "./render.js";
import { getSprite } from "./sprites.js";
import { getTexture } from "./textures.js";

export class Sprite extends RenderObject {
  constructor(public id: string) {
    super();
  }

  draw() {
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
  return new Sprite(id);
}
