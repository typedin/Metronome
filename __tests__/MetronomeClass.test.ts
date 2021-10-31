import {IMetronomeSoundPlayer} from "../src/services/players/MetronomeSoundPlayer"
import MetronomeClass from "../src/MetronomeClass";

describe("MetronomeClass", () => {
  let metronomeSoundPlayerMock: IMetronomeSoundPlayer

  beforeEach(() => {
    jest.useFakeTimers();
    metronomeSoundPlayerMock = function(): IMetronomeSoundPlayer{
      return {
          play: jest.fn(),
          stop: jest.fn()
      }
    }()
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('cannot be instanciate', () => {
    it("without a tempo", () => {
      expect(() => {
        // @ts-ignore: next-line
        new MetronomeClass(null, metronomeSoundPlayerMock);
      }).toThrow();
    });

    it("without a MetronomeSoundPlayer", () => {
      expect(() => {
        // @ts-ignore: next-line
        new MetronomeClass(60, undefined);
      }).toThrow();
    });
  })


  describe('when no errors are thrown', () => {
    it("can be started", () => {
      const metronome = new MetronomeClass(60, metronomeSoundPlayerMock);

      expect(metronome.isRunning).toBe(false);

      metronome.start();

      expect(metronome.isRunning).toBe(true);
    });

    it("can be stopped", () => {
      const metronome = new MetronomeClass(60, metronomeSoundPlayerMock);

      metronome.start();
      expect(metronome.isRunning).toBe(true);

      metronome.stop();
      expect(metronome.isRunning).toBe(false);
    });
  })

  describe('when errors are thrown', () => {
    it("cannot be started", () => {
      const badMetronome = {
        play: jest.fn(() => {
          throw new Error("Cannot start playing.")
        }),
        stop: jest.fn( () => {
          throw new Error("Cannot stop playing.")
          }),
      }
      const metronome = new MetronomeClass(60, badMetronome);

      expect(metronome.isRunning).toBe(false);

      metronome.start();

      expect(metronome.isRunning).toBe(false);
    });

    it("can be stopped", () => {
      const badMetronome = {
        play: jest.fn(),
        stop: jest.fn( () => {
          throw new Error("Cannot stop playing.")
          }),
      }
      const metronome = new MetronomeClass(60, badMetronome);

      metronome.start();
      expect(metronome.isRunning).toBe(true);

      metronome.stop();
      expect(metronome.isRunning).toBe(false);
    });
  })
});
