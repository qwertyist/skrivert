export type textSettingsType = {
  font: string;
  size: number;
  color: string;
  bgColor: string;
  lineHeight: number;
};

export type productionSettings = {
  using: {
    preset: string;
    shortformLists: string[];
    manuscripts: string[];
  };
  capitalizeAfter: {
    newLine: boolean;
    ellipsis: boolean;
    expanders: string[];
  };
  softClear: boolean;
};

export type messageType = {
  type: number;
  message: string;
  data: any;
  startTime?: number;
  endTime?: number;
};

export type productionInfo = {
  messages: messageType[];
};

export type captionSettings = {
  roll: boolean;
  lineLength: number;
  lines: number;
  targetShowTime: number;
  targetCPS: number;
  bufferTime: number;
  delayTime: number;
  text: textSettings;
};

export type sessionSettings = {
  maxClients: number;
  outputs: {
    zoomCC: boolean;
    GETlivecap: boolean;
    VTTstream: boolean;
    doc: boolean;
  };
  captions: captionSettings;
  password: string;
  scheduledStart: Date;
  scheduledEnd: Date;
};
