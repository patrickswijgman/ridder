type FontData = {
  family: string;
  size: number;
  height: number;
  font: string;
};

const fonts: Record<string, FontData> = {};

/**
 * Load a font.
 */
export async function loadFont(
  id: string,
  url: string,
  family: string,
  size: number,
  height = size,
) {
  const ff = new FontFace(family, `url(${url})`);

  await ff.load();

  document.fonts.add(ff);

  fonts[id] = {
    family,
    size,
    height,
    font: `${size}px ${family}`,
  };
}

/**
 * Get a loaded font.
 */
export function getFont(id: string): Readonly<FontData> {
  return fonts[id];
}
