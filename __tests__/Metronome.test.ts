import Metronome from "../src/Metronome";
import { AudioContext, registrar } from "standardized-audio-context-mock";
import { IAudioContext } from "standardized-audio-context";
import { INotePlayer } from "../src/NotePlayer";

describe("Metronome", () => {
  let audioContextMock: IAudioContext;
  let NotePlayer: INotePlayer;

  beforeEach(() => {
    NotePlayer = jest.fn(() => {});
    jest.useFakeTimers();
    audioContextMock = new AudioContext();
  });

  afterEach(() => {
    registrar.reset(audioContextMock);
    jest.useRealTimers();
  });

  it("can be instanciated and is not running by default", function () {
    const metronome = Metronome(60, audioContextMock, NotePlayer);

    expect(metronome.currentTempo).toEqual(60);
    expect(metronome.isRunning).toBe(false);
  });

  it("can have its tempo set", function () {
    const metronome = Metronome(42, audioContextMock, NotePlayer);

    expect(metronome.currentTempo).toEqual(42);
  });

  it("can be started", function () {
    const metronome = Metronome(60, audioContextMock, NotePlayer);

    expect(metronome.isRunning).toBe(false);
    expect(NotePlayer).not.toHaveBeenCalled();

    metronome.start();

    expect(metronome.isRunning).toBe(true);
    expect(NotePlayer).toHaveBeenLastCalledWith({
      time: expect.any(Number),
      beatNumber: expect.any(Number),
      audioContext: audioContextMock,
    });
  });
});
