/* export const defaultFontSettings = {
  size: 36,
  bg: "#000",
  fg: "#fff",
  p: {
    t: 60,
    r: 60,
    b: 60,
    l: 60,
  },
};*/
type MarginsType = {
  t: number;
  r: number;
  b: number;
  l: number;
};
export type FontSettingsType = {
  size: number;
  bg: string;
  fg: string;
  p: MarginsType;
};
