import { ctx } from "./canvas.js";
import { getFont } from "./fonts.js";
import { RenderObject } from "./render.js";

export class Text extends RenderObject {
  fontId = "default";
  color = "white";
  align: CanvasTextAlign = "left";
  baseline: CanvasTextBaseline = "top";

  constructor(public text: string) {
    super();
  }

  draw() {
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
  return new Text(text);
}
