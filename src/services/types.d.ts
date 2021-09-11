declare interface IMetronomeStepProvider {
  values: number[] | undefined;
}

declare interface IMetronomeStepper {
  getPrevious: Function<number> | null;
  getNext: Function<number> | null;
}

declare type Bpm = number;
declare type Applesauce = {
  bpm: Bpm;
};

declare enum MetronomeMode {
  INCREMENT,
  PRACTICE,
  TRADITIONAL,
}

declare interface MetronomeParams {
  soundPath: string;
  mode: MetronomeMode;
}

declare type MetronomeSetup = {
  intervalID: any | null;
  isPlaying: boolean;
  loopInterval: number;
  sound: string | null;
  tempo: Bpm;
  mode: MetronomeMode;
  soundPath: String;
};

export {
  Bpm,
  IMetronomeStepProvider,
  IMetronomeStepper,
  MetronomeMode,
  MetronomeParams,
  MetronomeSetup,
};
