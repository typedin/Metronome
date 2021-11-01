interface IMetronome {
  isRunning: boolean;
  start: Function;
  stop: Function;
  tempo: number;
}

export default function createMetronome(
  tempo: number,
  soundPlayer: Function
): IMetronome {
  if (!tempo) {
    throw new TypeError("tempo must be provided as an argument.");
  }

  if (!soundPlayer) {
    throw new TypeError(
      "metronomeSoundPlayer must be provided as an argument."
    );
  }

  const localSoundPlayer = soundPlayer(tempo);

  return {
    tempo,
    isRunning: false,
    start() {
      try {
        localSoundPlayer.play();
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
  };
}
