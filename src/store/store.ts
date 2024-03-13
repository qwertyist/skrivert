import { writable } from "svelte/store";
import { textSettingsType } from "../global.d.ts";

const defaultTextSettings: textSettingsType = {
  font: "sans-serif",
  size: 36,
  color: "black",
  bgColor: "white",
  lineHeight: 1.2,
};

export const textSettingsStore = writable({
  defaultTextSettings,
});

export const sessionSettingsStore = writable();

export const shortformsStore = writable();

// export const documentsStore = writable();
