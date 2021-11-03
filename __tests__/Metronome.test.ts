import createMetronome from "../src/Metronome";
import { IMetronomeSoundPlayer } from "../src/services/MetronomeSoundPlayer";

describe("Metronome", () => {
  const playMock = jest.fn();
  const stopMock = jest.fn();

  function PlayerThatCannotPlay(): IMetronomeSoundPlayer {
    return {
      play: jest.fn(() => {
        throw new Error("Cannot start playing.");
      }),
      stop: jest.fn(() => {
        throw new Error("Cannot stop playing.");
      }),
    };
  }

  function PlayerThatCannotStop(): IMetronomeSoundPlayer {
    return {
      play: jest.fn(),
      stop: jest.fn(() => {
        throw new Error("Cannot stop playing.");
      }),
    };
  }

  function metronomeSoundPlayerMock(): IMetronomeSoundPlayer {
    return {
      play: playMock,
      stop: stopMock,
    };
  }

  beforeEach(() => {
    playMock.mockClear();
    stopMock.mockClear();
  });

  describe("cannot be instanciate", () => {
    it("without a tempo", () => {
      expect(() => {
        // @ts-ignore: next-line
        createMetronome(null, metronomeSoundPlayerMock);
      }).toThrow("tempo must be provided as an argument.");
    });

    it("without a MetronomeSoundPlayer", () => {
      expect(() => {
        // @ts-ignore: next-line
        createMetronome(60, undefined);
      }).toThrow("metronomeSoundPlayer must be provided as an argument.");
    });
  });

  describe("when no errors are thrown", () => {
    it("can be started", () => {
      const metronome = createMetronome(60, metronomeSoundPlayerMock);

      expect(metronome.isRunning).toBe(false);

      metronome.start();

      expect(metronome.isRunning).toBe(true);
      expect(playMock).toBeCalledTimes(1);
    });

    it("can be stopped", () => {
      const metronome = createMetronome(60, metronomeSoundPlayerMock);
      metronome.start();
      expect(metronome.isRunning).toBe(true);

      metronome.stop();

      expect(metronome.isRunning).toBe(false);
      expect(stopMock).toBeCalledTimes(1);
    });
  });

  describe("when errors are thrown", () => {
    it("should not be running when an error occures when start throws", () => {
      const metronome = createMetronome(60, PlayerThatCannotPlay);

      expect(metronome.isRunning).toBe(false);

      metronome.start();

      expect(metronome.isRunning).toBe(false);
    });

    it("should not be running when an error occures when stop throws", () => {
      const metronome = createMetronome(60, PlayerThatCannotStop);

      metronome.start();
      expect(metronome.isRunning).toBe(true);

      metronome.stop();
      expect(metronome.isRunning).toBe(false);
    });
  });
});
