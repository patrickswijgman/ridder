import { ctx } from "./canvas.js";
import { RenderObject } from "./render.js";
import { getSprite } from "./sprites.js";
import { getTexture } from "./textures.js";

export class Sprite extends RenderObject {
  /** The id of the sprite, this is a reference to the sprite loaded in memory. */
  id = "";

  /**
   * Draw this sprite on the canvas.
   */
  draw() {
    if (!this.id) return;

    super.draw();

    const sprite = getSprite(this.id);
    const texture = getTexture(sprite.textureId);

    ctx.drawImage(
      texture.source,
      sprite.x,
      sprite.y,
      sprite.w,
      sprite.h,
      -sprite.pivotX,
      -sprite.pivotY,
      sprite.w,
      sprite.h,
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
