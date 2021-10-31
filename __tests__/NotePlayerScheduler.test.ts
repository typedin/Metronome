import {
  AudioBuffer,
  AudioContext,
  registrar,
} from "standardized-audio-context-mock";
import { NotePlayerScheduler } from "../src/NotePlayerScheduler";

describe("NotePlayer", () => {
  let audioBufferMock: AudioBuffer;
  let audioContextMock: AudioContext;

  beforeEach(() => {
    audioBufferMock = new AudioBuffer({ length: 10, sampleRate: 44100 });
    audioContextMock = new AudioContext();
  });

  afterEach(() => {
    registrar.reset(audioContextMock);
  });

  it("should create a new AudioBufferSourceNode", () => {
    NotePlayerScheduler(
      audioBufferMock,
      audioContextMock,
      1,
      audioContextMock.currentTime
    );

    expect(
      registrar.getAudioNodes(audioContextMock, "AudioBufferSourceNode").length
    ).toEqual(1);
  });

  it("should set the buffer property of the AudioBufferSourceNode", () => {
    NotePlayerScheduler(
      audioBufferMock,
      audioContextMock,
      1,
      audioContextMock.currentTime
    );

    const [audioBufferSourceNodeMock] = registrar.getAudioNodes(
      audioContextMock,
      "AudioBufferSourceNode"
    );

    expect(audioBufferSourceNodeMock.buffer).toEqual(audioBufferMock);
  });

  it("should connect the AudioBufferSourceNode to destination", () => {
    NotePlayerScheduler(
      audioBufferMock,
      audioContextMock,
      1,
      audioContextMock.currentTime
    );

    const thing = registrar.getAudioNodes(
      audioContextMock,
      "AudioBufferSourceNode"
    );
    console.log(thing);

    const thing2 = registrar.getAudioNodes(audioContextMock, "OscillatorNode");
    console.log(thing2);
  });
});
