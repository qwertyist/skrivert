export type KeyboardOptions = {
  listIds: Array<string>;
};

export type QuillRange = {
  index: number;
};

export type QuillContext = {
  prefix: string;
};

export type ShortformExportType = {
  sf: string;
  p: string;
  u: Date;
};

type KeyType = {
  keyCode: number;
  shiftKey?: boolean;
  ctrlKey?: boolean;
};

export type ExpanderType = {
  key: KeyType;
  symbol: string;
  fullstop: boolean;
};

type HotkeyType = {
  key: KeyType;
  symbol: string;
  action(params: any, symbol: string): boolean;
};
