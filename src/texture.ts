import { BaseObject } from "./base.js";
import { ctx } from "./canvas.js";
import { getTexture } from "./textures.js";

export class Texture extends BaseObject {
  /** The id of the texture, this is a reference to the texture loaded in memory */
  id = "";

  /**
   * Draw this texture on the canvas.
   */
  draw() {
    if (!this.id) return;

    super.draw();

    ctx.drawImage(getTexture(this.id), 0, 0);
  }
}

/**
 * Create a Texture instance, ready for drawing.
 */
export function texture(id = "") {
  const obj = new Texture();

  obj.id = id;

  return obj;
}
