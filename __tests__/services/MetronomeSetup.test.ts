import MetronomeSetup from "../../src/services/MetronomeSetup";

describe("MetronomeSetup", function () {
  it("has sensible defaults", () => {
    const sut = MetronomeSetup({
      mode: 0,
      soundPath: "a/path/to/a/file",
    });

    expect(sut).toEqual({
      intervalID: null,
      isPlaying: false,
      loopInterval: 1000,
      mode: 0,
      sound: null,
      soundPath: "a/path/to/a/file",
      tempo: 60,
    });
  });

  it("accepts tempo as a parameter", () => {
    const sut = MetronomeSetup(
      {
        mode: 0,
        soundPath: "a/path/to/a/file",
      },
      80
    );

    expect(sut).toEqual({
      intervalID: null,
      isPlaying: false,
      loopInterval: 750,
      mode: 0,
      sound: null,
      soundPath: "a/path/to/a/file",
      tempo: 80,
    });
  });
});
