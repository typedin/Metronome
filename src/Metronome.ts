import { INotePlayerScheduler } from "./NotePlayerScheduler";
import { IAudioContext } from "standardized-audio-context";

type Note = {
  note: number;
  time: number;
};

export default function Metronome(
  tempo: number,
  audioContext: IAudioContext,
  NotePlayerScheduler: INotePlayerScheduler
) {
  let intervalID: any = null;
  let nextNoteTime: number;
  let currentNote: number;
  let LOOK_AHEAD: number = 25;

  let notesInQueue: Note[] = []; // notes that have been put into the web audio and may or may not have been played yet {note, time}
  const SCHEDULE_AHEAD_TIME = 0.1; // How far ahead to schedule audio (sec)
  let isRunning: boolean = false;

  const nextNote = function (this: any) {
    // Advance current note and time by a quarter note (crotchet if you're posh)
    var secondsPerBeat = 60.0 / tempo; // Notice this picks up the CURRENT tempo value to calculate beat length.
    nextNoteTime += secondsPerBeat; // Add beat length to last beat time

    currentNote++; // Advance the beat number, wrap to zero
    if (currentNote == 4) {
      currentNote = 0;
    }
  };

  const scheduler = function (): void {
    // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
    const areThereNotesToBePlayed = function (): boolean {
      return nextNoteTime < audioContext.currentTime + SCHEDULE_AHEAD_TIME;
    };

    while (areThereNotesToBePlayed()) {
      NotePlayerScheduler({
        time: nextNoteTime,
        beatNumber: currentNote,
        audioContext,
      });
      nextNote();
    }
  };

  const start = function (this: any): void {
    if (this.isRunning) {
      return;
    }

    try {
      currentNote = 0;
      nextNoteTime = audioContext.currentTime + 0.05;
      intervalID = setInterval(scheduler(), LOOK_AHEAD);
      this.isRunning = true;
    } catch (error) {
      console.log(error);
    }
  };

  const stop = function (this: any): void {
    this.isRunning = false;

    clearInterval(intervalID);
  };

  return {
    stop,
    start,
    isRunning,
    currentTempo: tempo,
  };
}
