import { ctx } from "./canvas.js";
import { getFont } from "./fonts.js";
import { RenderObject } from "./render.js";

export class Text extends RenderObject {
  text = "";
  fontId = "default";
  align: CanvasTextAlign = "left";
  baseline: CanvasTextBaseline = "top";

  draw() {
    if (!this.text) return;

    super.draw();

    ctx.font = getFont(this.fontId);
    ctx.textAlign = this.align;
    ctx.textBaseline = this.baseline;
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, 0, 0);
  }
}

/**
 * Create a Text instance, ready for drawing.
 */
export function text(text = "") {
  const obj = new Text();

  obj.text = text;

  return obj;
}
