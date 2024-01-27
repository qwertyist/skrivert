import type { FontSettingsType } from "./index.d.ts";
export const defaultFontSettings: FontSettingsType = {
  size: 36,
  bg: "#000",
  fg: "#fff",
  p: {
    t: 60,
    r: 60,
    b: 60,
    l: 60,
  },
};

export function getColorSettings() {
  return { bg: defaultFontSettings.bg, fg: defaultFontSettings.fg };
}
export function getFontSettings(settings: FontSettingsType): string {
  if (settings == undefined) {
    const obj: Record<string, string> = {
      "font-size": defaultFontSettings.size + "px",
      color: defaultFontSettings.fg,
      "background-color": defaultFontSettings.bg,
      padding: `${defaultFontSettings.p.t}px ${defaultFontSettings.p.r}px ${defaultFontSettings.p.b}px ${defaultFontSettings.p.l}px`,
      "overflow-y": "hidden",
    };
    return Object.keys(obj)
      .map((k: string) => `${k}: ${obj[k]}`)
      .join(";");
  }
  return "";
}
