import { IMetronomeSoundPlayer } from "../src/services/players/MetronomeSoundPlayer"
import { IAudioContext, } from "standardized-audio-context";

type Note = {
  note: number;
  time: number;
};

export default class MetronomeClass {
  audioContext: IAudioContext | null = null;
  notesInQueue: Note[] = [];
  currentNote: number;
  tempo: number;
  lookahead: number;
  scheduleAheadTime: number;
  nextNoteTime: number;
  isRunning: boolean = false;
  intervalID: null;
  soundplayer: IMetronomeSoundPlayer

  constructor(tempo: number, metronomeSoundPlayer: IMetronomeSoundPlayer) {
    if (!tempo) {
      throw new TypeError("tempo must be provided as an argument.");
    }
    this.tempo = tempo;

    if(!metronomeSoundPlayer) {
      throw new TypeError("tempo must be provided as an argument.");
    }
    this.soundplayer = metronomeSoundPlayer

    // this.audioContext = null;
    this.notesInQueue = []; // notes that have been put into the web audio and may or may not have been played yet {note, time}
    this.currentNote = 0;
    this.lookahead = 25; // How frequently to call scheduling function (in milliseconds)
    this.scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)
    this.nextNoteTime = 0.0; // when the next note is due
  }

  start() {
    if (this.isRunning) return;

    this.currentNote = 0;
    try {
      this.soundplayer.play()
      this.isRunning = true;

    } catch (error) {
      this.isRunning = false;
    }

    /* this.audioContext = new AudioContext();


    this.nextNoteTime = this.audioContext.currentTime + 0.05;

    this.intervalID = setInterval(() => this.scheduler(), this.lookahead); */
  }

    stop() {
      try {
        this.soundplayer.stop()
        this.isRunning = false;
        clearInterval(this.intervalID);
      } catch (error) {

        this.isRunning = false;
        clearInterval(this.intervalID);
      }

  }

  nextNote() {
    // Advance current note and time by a quarter note (crotchet if you're posh)
    var secondsPerBeat = 60.0 / this.tempo; // Notice this picks up the CURRENT tempo value to calculate beat length.
    this.nextNoteTime += secondsPerBeat; // Add beat length to last beat time

    this.currentNote++; // Advance the beat number, wrap to zero
    if (this.currentNote == 4) {
      this.currentNote = 0;
    }
  }

  scheduleNote(beatNumber: number, time: number) {
    // push the note on the queue, even if we're not playing.
    this.notesInQueue.push({ note: beatNumber, time: time });

    // create an oscillator
    const osc = this.audioContext.createOscillator();
    const envelope = this.audioContext.createGain();

    osc.frequency.value = beatNumber % 4 == 0 ? 1000 : 800;
    envelope.gain.value = 1;
    envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
    envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

    osc.connect(envelope);
    envelope.connect(this.audioContext.destination);

    osc.start(time);
    osc.stop(time + 0.03);
  }

  scheduler() {
    // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
    while (
      this.nextNoteTime <
      this.audioContext.currentTime + this.scheduleAheadTime
    ) {
      this.scheduleNote(this.currentNote, this.nextNoteTime);
      this.nextNote();
    }
  }
}
