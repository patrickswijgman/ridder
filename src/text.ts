import { BaseObject } from "./base.js";
import { ctx } from "./canvas.js";
import { getFont } from "./fonts.js";

export class Text extends BaseObject {
  /** The text to draw. */
  text = "";
  /** The id of the font, this is a reference to the font loaded in memory */
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

    ctx.font = getFont(this.fontId);
    ctx.textAlign = this.align;
    ctx.textBaseline = this.baseline;
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, 0, 0, this.maxWidth);
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
