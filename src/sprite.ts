import { BaseObject } from "./base.js";
import { ctx } from "./canvas.js";
import { getSprite } from "./sprites.js";
import { getTexture } from "./textures.js";

export class Sprite extends BaseObject {
  /** The id of the sprite, this is a reference to the sprite loaded in memory */
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
