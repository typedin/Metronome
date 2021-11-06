import { IMetronomeStepper } from "./services/types";

interface IMetronome {
  tempo: number;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  decreaseTempo: () => number;
  increaseTempo: () => number;
}

export default function createMetronome(
  tempo: number,
  soundPlayer: Function,
  stepper: (tempo: number) => IMetronomeStepper
): IMetronome {
  if (!tempo) {
    throw new TypeError("tempo must be provided as an argument.");
  }

  if (!soundPlayer) {
    throw new TypeError(
      "metronomeSoundPlayer must be provided as an argument."
    );
  }

  if (!stepper) {
    throw new TypeError("stepper must be provided as an argument.");
  }

  const localSoundPlayer = soundPlayer(tempo);
  const localStepper = stepper(tempo);

  return {
    tempo,
    isRunning: false,
    start() {
        localSoundPlayer.play();
        try {
        this.isRunning = true;
      } catch (error) {
        this.isRunning = false;
      }
    },
    stop() {
      try {
        localSoundPlayer.stop();
        this.isRunning = false;
      } catch (error) {
        this.isRunning = false;
      }
    },
    decreaseTempo() {
      return localStepper.getPrevious() || tempo;
    },
    increaseTempo() {
      return localStepper.getNext() || tempo;
    },
  };
}
