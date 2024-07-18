import { ctx } from "./canvas.js";
import { getFont } from "./fonts.js";
import { RenderObject } from "./render.js";

type TextAlign = "left" | "center" | "right";

type TextBaseline = "top" | "middle" | "bottom";

export class Text extends RenderObject {
  /** The text to draw. */
  text = "";
  /** The id of the font, this is a reference to the font loaded in memory. */
  fontId = "default";
  /** The horizontal alignment */
  align: TextAlign = "left";
  /** The vertical alignment. */
  baseline: TextBaseline = "top";

  /**
   * Draw the text on the canvas.
   */
  draw() {
    if (!this.text) return;

    super.draw();

    const fnt = getFont(this.fontId);
    const font = fnt ? fnt.font : "16px sans-serif";
    const height = fnt ? fnt.height : 16;

    ctx.font = font;
    ctx.textAlign = this.align;
    ctx.textBaseline = this.baseline;
    ctx.fillStyle = this.color;

    const lines = this.text.split("\n");

    switch (this.baseline) {
      case "middle":
        ctx.translate(0, -height * ((lines.length - 1) / 2));
        break;

      case "bottom":
        ctx.translate(0, -height * (lines.length - 1));
        break;
    }

    for (const line of lines) {
      ctx.fillText(line, -this.pivot.x, -this.pivot.y);
      ctx.translate(0, height);
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
