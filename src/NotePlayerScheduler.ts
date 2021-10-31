import { IAudioBuffer, IAudioContext } from "standardized-audio-context";

export interface INotePlayerScheduler {}

export function NotePlayerScheduler(
  audioBuffer: IAudioBuffer,
  audioContext: IAudioContext,
  beatNumber: number,
  time: number
) {
  const notesInQueue = [];
  notesInQueue.push({ note: beatNumber, time: time });

  const audioBufferSourceNode = audioContext.createBufferSource();
  audioBufferSourceNode.buffer = audioBuffer;
  audioBufferSourceNode.connect(audioContext.destination);

  const envelope = audioContext.createGain();
  envelope.gain.value = 1;
  envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
  envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);
  envelope.connect(audioContext.destination);

  const osc = audioContext.createOscillator();
  osc.connect(envelope);
  osc.frequency.value = beatNumber % 4 == 0 ? 1000 : 800;
  osc.start(time);
  osc.stop(time + 0.03);
}
/*
const scheduleNote = function ({ beatNumber, time }) {
  // push the note on the queue, even if we're not playing.
  notesInQueue.push({ note: beatNumber, time: time });

  // create an oscillator
  const osc = audioContext.createOscillator();
  const envelope = audioContext.createGain();

  envelope.gain.value = 1;
  envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
  envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

  osc.connect(envelope);
  envelope.connect(audioContext.destination);

  osc.start(time);
  osc.stop(time + 0.03);
};
*/
