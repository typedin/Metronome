import createMetronome from "../src/Metronome";
import { IMetronomeSoundPlayer } from "../src/services/MetronomeSoundPlayer";
import { IMetronomeStepper } from "../src/services/types";

describe("Metronome", () => {
  const playMock = jest.fn();
  const stopMock = jest.fn();

  function metronomeSoundPlayerMock(): IMetronomeSoundPlayer {
    return {
      play: playMock,
      stop: stopMock,
    };
  }

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

  function StepperMock(): IMetronomeStepper {
    return {
      getNext: () => 61,
      getPrevious: () => 59,
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
        createMetronome(null, metronomeSoundPlayerMock, StepperMock);
      }).toThrow("tempo must be provided as an argument.");
    });

    it("without a MetronomeSoundPlayer", () => {
      expect(() => {
        // @ts-ignore: next-line
        createMetronome(60, undefined, StepperMock);
      }).toThrow("metronomeSoundPlayer must be provided as an argument.");
    });

    it("without a MetronomeStepper", () => {
      expect(() => {
        // @ts-ignore: next-line
        createMetronome(60, metronomeSoundPlayerMock, undefined);
      }).toThrow("stepper must be provided as an argument.");
    });
  });

  describe("when no errors are thrown", () => {
    it("can be started", () => {
      const metronome = createMetronome(
        60,
        metronomeSoundPlayerMock,
        StepperMock
      );

      expect(metronome.isRunning).toBe(false);

      metronome.start();

      expect(metronome.isRunning).toBe(true);
      expect(playMock).toBeCalledTimes(1);
    });

    it("can be stopped", () => {
      const metronome = createMetronome(
        60,
        metronomeSoundPlayerMock,
        StepperMock
      );
      metronome.start();
      expect(metronome.isRunning).toBe(true);

      metronome.stop();

      expect(metronome.isRunning).toBe(false);
      expect(stopMock).toBeCalledTimes(1);
    });

    it("can give the previous tempo", () => {
      const metronome = createMetronome(
        60,
        metronomeSoundPlayerMock,
        StepperMock
      );

      const newTempo = metronome.decreaseTempo();

      expect(newTempo).toBeLessThan(60);
    });

    it("can give the next tempo", () => {
      const metronome = createMetronome(
        60,
        metronomeSoundPlayerMock,
        StepperMock
      );

      const newTempo = metronome.increaseTempo();

      expect(newTempo).toBeGreaterThan(60);
    });
  });

  describe("when errors are thrown", () => {
    it("should not be running when an error occures when start throws", () => {
      const metronome = createMetronome(60, PlayerThatCannotPlay, StepperMock);

      expect(metronome.isRunning).toBe(false);

      metronome.start();

      expect(metronome.isRunning).toBe(false);
    });

    it("should not be running when an error occures when stop throws", () => {
      const metronome = createMetronome(60, PlayerThatCannotStop, StepperMock);

      metronome.start();
      expect(metronome.isRunning).toBe(true);

      metronome.stop();
      expect(metronome.isRunning).toBe(false);
    });
  });
});
