import { Metronome } from "../src/Metronome";

describe("Metronome", () => {
  it("can be instanciated and is not running by default", function () {
    const metronome = Metronome();

    expect(metronome.currentTempo).toEqual(60);
    expect(metronome.isRunning).toBe(false);
  });

  it("can have its tempo set", function () {
    const metronome = Metronome(42);

    expect(metronome.currentTempo).toEqual(42);
  });

  it("can be started and stopped", function () {
    const metronome = Metronome();

    expect(metronome.isRunning).toBe(false);

    metronome.start();

    expect(metronome.isRunning).toBe(true);

    metronome.stop();

    expect(metronome.isRunning).toBe(false);
  });
});
