import Maelzel from "../../src/services/Maelzel";

describe("Maelzel", function () {
  describe("steps", function () {
    it("should give the previous step", function () {
      const tempo = 60;
      const sut = Maelzel(tempo);

      expect(sut.getPrevious()).toBe(58);
    });

    it("should give the next step", function () {
      const tempo = 60;
      const sut = Maelzel(tempo);

      expect(sut.getNext()).toBe(63);
    });

    it("should not go beyond lower limit", function () {
      const tooLow = 39;
      const sut = Maelzel(tooLow);

      expect(sut.getPrevious()).toBe(undefined);
    });

    it("should not go beyond upper limit", function () {
      const tooHigh = 209;
      const sut = Maelzel(tooHigh);

      expect(sut.getNext()).toBe(undefined);
    });
  });

  it("should find the closest tempo for a given tempo that is not in the predefined tempos", function () {
    const notValidTempo = 61;
    const sut = Maelzel(notValidTempo);

    expect(sut.getPrevious()).toBe(58);
    expect(sut.getNext()).toBe(63);
  });
});
