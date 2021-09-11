import { MetronomeParams, MetronomeSetup } from "./types";

import BpmToMS from "../../src/services/BpmToMS";

export default function (params: MetronomeParams, tempo = 60): MetronomeSetup {
  return {
    intervalID: null,
    isPlaying: false,
    loopInterval: BpmToMS({ tempo }).toMS(),
    mode: params.mode,
    sound: null,
    soundPath: params.soundPath,
    tempo,
  };
}
