import { AudioContext, registrar } from "standardized-audio-context-mock";
import { IAudioContext } from "standardized-audio-context";
import MetronomeClass from "../src/MetronomeClass";

describe("MetronomeClass", () => {
  let audioContextMock: IAudioContext;

  beforeEach(() => {
    jest.useFakeTimers();
    audioContextMock = new AudioContext();
  });

  afterEach(() => {
    registrar.reset(audioContextMock);
    jest.useRealTimers();
  });

  it("cannot be instanciate without a tempo", () => {
    expect(() => {
      // @ts-ignore: next-line
      new MetronomeClass();
    }).toThrow();
  });

  it("is not running by default", () => {
    const metronome = new MetronomeClass(60);

    expect(metronome.isRunning).toBe(false);
  });

  it("can be started", () => {
    const metronome = new MetronomeClass(60);
    expect(metronome.isRunning).toBe(false);

    metronome.start();
    expect(metronome.isRunning).toBe(true);
    expect(
      registrar.getAudioNodes(audioContextMock, "AudioBufferSourceNode").length
    ).toEqual(1);
  });
});
