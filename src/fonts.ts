const fonts: Record<string, string> = {};

/**
 * Load a font.
 */
export async function loadFont(
  id: string,
  url: string,
  family: string,
  size: number,
) {
  const ff = new FontFace(family, `url(${url})`);

  await ff.load();

  document.fonts.add(ff);

  fonts[id] = `${size}px ${family}`;
}

/**
 * Get a loaded font.
 */
export function getFont(id: string) {
  return fonts[id];
}
