export type Font = {
  face: FontFace;
  size: number;
};

const fonts: Record<string, Font> = {};

export async function loadFont(id: string, url: string, family: string, size: number) {
  const face = new FontFace(family, `url(${url})`);
  await face.load();
  document.fonts.add(face);
  fonts[id] = { face, size };
}

export function getFont(id: string) {
  return fonts[id];
}
