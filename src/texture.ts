import { ctx } from "./canvas.js";
import { RenderObject } from "./render.js";
import { getTexture } from "./textures.js";

export class Texture extends RenderObject {
  /** The id of the texture, this is a reference to the texture loaded in memory. */
  id = "";

  /**
   * Draw this texture on the canvas.
   */
  draw() {
    if (!this.id) return;

    super.draw();

    const texture = getTexture(this.id);

    ctx.drawImage(texture, -this.pivot.x, -this.pivot.y);
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
