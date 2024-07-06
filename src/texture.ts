import { ctx } from "./canvas.js";
import { RenderObject } from "./render.js";
import { getTexture } from "./textures.js";

export class Texture extends RenderObject {
  constructor(public id: string) {
    super();
  }

  draw() {
    super.draw();

    ctx.drawImage(getTexture(this.id), 0, 0);
  }
}

/**
 * Create a Texture instance, ready for drawing.
 */
export function texture(id = "") {
  return new Texture(id);
}
