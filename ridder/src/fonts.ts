const fonts: Record<string, string> = {};

/**
 * Load a font into the cache.
 *
 * Use `setFont` in the `setup` or `render` functions to use the font in the upcoming text rendering.
 *
 * @param id - The name of the font in the cache.
 * @param url - The url to the `.ttf` or `.otf` file.
 * @param family - The name of the font family.
 * @param size - The base size in pixels.
 */
export async function loadFont(id: string, url: string, family: string, size: number) {
  const font = new FontFace(family, `url(${url})`);
  await font.load();
  document.fonts.add(font);
  fonts[id] = `${size}px ${font.family}`;
}

/**
 * Get a font from the cache.
 */
export function getFont(id: string) {
  return fonts[id];
}
