import setup from "../../src/applesauce/setup";

describe("setup", function () {
  const defaultParams = {
    soundPath: "a/path/to/a/file",
    mode: "increment",
  };
  it("has sensible defaults", () => {
    const sut = setup({ ...defaultParams });

    expect(sut).toEqual({
      tempo: 60,
      loopInterval: 1000,
      mode: "increment",
      sound: null,
      intervalID: null,
      isPlaying: false,
      soundPath: defaultParams.soundPath,
    });
  });

  it("accepts tempo as a parameter", () => {
    const sut = setup({ ...defaultParams }, 80);

    expect(sut).toEqual({
      tempo: 80,
      loopInterval: 750,
      mode: "increment",
      sound: null,
      intervalID: null,
      isPlaying: false,
      soundPath: defaultParams.soundPath,
    });
  });

  it("can have a mode set to traditional", () => {
    const sut = setup({ ...defaultParams, mode: "traditional" });
    expect(sut).toEqual({
      tempo: 60,
      loopInterval: 1000,
      mode: "traditional",
      sound: null,
      intervalID: null,
      isPlaying: false,
      soundPath: defaultParams.soundPath,
    });
  });
});
