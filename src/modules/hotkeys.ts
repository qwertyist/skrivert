import type { HotkeyType } from "./index.d.ts";

function dummy_function(params: any, symbol: string): boolean {
  console.log(symbol, params);
  return false;
}

function clearText(params: any, symbol: string): boolean {
    console.log("clear text")
    return false
}

export const defaultHotkeys: Array<HotkeyType> = [
  {
    symbol: "F1",
    key: { keyCode: 112, shiftKey: false, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "Shift+F1",
    key: { keyCode: 112, shiftKey: true, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "Ctrl+F1",
    key: { keyCode: 112, shiftKey: false, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "F2",
    key: { keyCode: 113, shiftKey: false, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "Shift+F2",
    key: { keyCode: 113, shiftKey: true, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "Ctrl+F2",
    key: { keyCode: 113, shiftKey: false, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "F3",
    key: { keyCode: 114, shiftKey: false, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "Shift+F3",
    key: { keyCode: 114, shiftKey: true, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "Ctrl+F3",
    key: { keyCode: 114, shiftKey: false, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "F4",
    key: { keyCode: 115, shiftKey: false, ctrlKey: false },
    action: clearText,
  },
  {
    symbol: "Shift+F4",
    key: { keyCode: 115, shiftKey: true, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "Ctrl+F4",
    key: { keyCode: 115, shiftKey: false, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "F5",
    key: { keyCode: 116, shiftKey: false, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "Shift+F5",
    key: { keyCode: 116, shiftKey: true, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "Ctrl+F5",
    key: { keyCode: 116, shiftKey: false, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "F6",
    key: { keyCode: 117, shiftKey: false, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "Shift+F6",
    key: { keyCode: 117, shiftKey: true, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "Ctrl+F6",
    key: { keyCode: 117, shiftKey: false, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "F7",
    key: { keyCode: 118, shiftKey: false, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "Shift+F7",
    key: { keyCode: 118, shiftKey: true, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "Ctrl+F7",
    key: { keyCode: 118, shiftKey: false, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "F8",
    key: { keyCode: 119, shiftKey: false, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "Shift+F8",
    key: { keyCode: 119, shiftKey: true, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "Ctrl+F8",
    key: { keyCode: 119, shiftKey: false, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "F9",
    key: { keyCode: 120, shiftKey: false, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "Shift+F9",
    key: { keyCode: 120, shiftKey: true, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "Ctrl+F9",
    key: { keyCode: 120, shiftKey: false, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "F10",
    key: { keyCode: 121, shiftKey: false, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "Shift+F10",
    key: { keyCode: 121, shiftKey: true, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "Ctrl+F10",
    key: { keyCode: 121, shiftKey: false, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "F11",
    key: { keyCode: 122, shiftKey: false, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "Shift+F11",
    key: { keyCode: 122, shiftKey: true, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "Ctrl+F11",
    key: { keyCode: 122, shiftKey: false, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "F12",
    key: { keyCode: 123, shiftKey: false, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "Shift+F12",
    key: { keyCode: 123, shiftKey: true, ctrlKey: false },
    action: dummy_function,
  },
  {
    symbol: "Ctrl+F12",
    key: { keyCode: 123, shiftKey: false, ctrlKey: false },
    action: dummy_function,
  },
];
