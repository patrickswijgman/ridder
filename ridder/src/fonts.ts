const fonts: Record<string, string> = {};

export async function loadFont(id: string, url: string, family: string, size: number) {
  const font = new FontFace(family, `url(${url})`);
  await font.load();
  document.fonts.add(font);
  fonts[id] = `${size}px ${font.family}`;
}

export function getFont(id: string) {
  return fonts[id];
}
