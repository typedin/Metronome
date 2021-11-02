export interface IMetronomeSoundPlayer {
  play: Function;
  stop: Function;
}

export const webPlayer = function (tempo: number): IMetronomeSoundPlayer {
  let currentNote: number = 0;
  let audioContext = new AudioContext();
  let nextNoteTime = 0.0; // when the next note is due
  let intervalID: any;

  // this.audioContext = null;
  let notesInQueue = []; // notes that have been put into the web audio and may or may not have been played yet {note, time}
  let lookahead = 25; // How frequently to call scheduling function (in milliseconds)
  let scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)

  function play() {
    currentNote = 0;

    nextNoteTime = audioContext.currentTime + 0.05;

    intervalID = setInterval(() => scheduler(), lookahead);
  }

  function scheduler() {
    // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
    while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
      scheduleNote(currentNote, nextNoteTime);
      nextNote();
    }
  }

  function scheduleNote(beatNumber: number, time: number) {
    // push the note on the queue, even if we're not playing.
    notesInQueue.push({ note: beatNumber, time: time });

    // create an oscillator
    const osc = audioContext.createOscillator();
    const envelope = audioContext.createGain();

    osc.frequency.value = beatNumber % 4 == 0 ? 4000 : 400;
    envelope.gain.value = 1;
    envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
    envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

    osc.connect(envelope);
    envelope.connect(audioContext.destination);

    osc.start(time);
    osc.stop(time + 0.03);
  }

  function nextNote() {
    // Advance current note and time by a quarter note (crotchet if you're posh)
    var secondsPerBeat = 60.0 / tempo; // Notice this picks up the CURRENT tempo value to calculate beat length.
    nextNoteTime += secondsPerBeat; // Add beat length to last beat time

    currentNote++; // Advance the beat number, wrap to zero
    if (currentNote == 4) {
      currentNote = 0;
    }
  }

  function stop() {
    clearInterval(intervalID);
  }

  return {
    play,
    stop,
  };
};
