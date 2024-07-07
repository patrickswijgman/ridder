import { ctx } from "./canvas.js";
import { RenderObject } from "./render.js";
import { getTexture } from "./textures.js";

export class Texture extends RenderObject {
  id = "";

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
