import { ctx } from "./canvas.js";
import { getFont } from "./fonts.js";
import { RenderObject } from "./render.js";

export class Text extends RenderObject {
  /** The text to draw. */
  text = "";
  /** The id of the font, this is a reference to the font loaded in memory. */
  fontId = "default";
  /** The horizontal alignment */
  align: CanvasTextAlign = "left";
  /** The vertical alignment. */
  baseline: CanvasTextBaseline = "top";
  /** The maximum of width in pixels before it is scaled down to fit the width. */
  maxWidth = Number.MAX_SAFE_INTEGER;

  /**
   * Draw the text on the canvas.
   */
  draw() {
    if (!this.text) return;

    super.draw();

    const font = getFont(this.fontId);

    if (font) {
      ctx.font = font.font;
    }

    ctx.textAlign = this.align;
    ctx.textBaseline = this.baseline;
    ctx.fillStyle = this.color;

    const lines = this.text.split("\n");

    for (const line of lines) {
      ctx.fillText(line, -this.pivot.x, -this.pivot.y, this.maxWidth);
      ctx.translate(0, font.height);
    }
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
