import BpmToMS from "../../src/services/BpmToMS";

interface MetronomeParams {
  soundPath: string;
  mode: "increment" | "traditional";
}

export default function (params: MetronomeParams, tempo = 60): MetronomeSetup {
  return {
    intervalID: null,
    isPlaying: false,
    mode: params.mode,
    loopInterval: BpmToMS({ tempo }).toMS(),
    sound: null,
    tempo,
    soundPath: params.soundPath,
  };
}
