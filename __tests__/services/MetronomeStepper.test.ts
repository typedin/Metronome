import MetronomeStepper from "../../src/services/MetronomeStepper";

describe("MetronomeStepper", () => {
  const tempo = 60;
  const values = () => [20, 60, 80];

  describe("steps", () => {
    it("should give the previous step", function () {
      const sut = MetronomeStepper(values, tempo);

      expect(sut.getPrevious()).toBe(20);
    });

    it("should give the next step", function () {
      const sut = MetronomeStepper(values, tempo);

      expect(sut.getNext()).toBe(80);
    });

    it("should not go beyond lower limit", function () {
      const tooLow = 19;
      const sut = MetronomeStepper(values, tooLow);

      expect(sut.getPrevious()).toBe(undefined);
    });

    it("should not go beyond upper limit", function () {
      const tooHigh = 81;
      const sut = MetronomeStepper(values, tooHigh);

      expect(sut.getNext()).toBe(undefined);
    });
  });

  it("should find the closest tempo for a given tempo that is not in the predefined tempos", function () {
    const notAValidTempo = 61;
    const sut = MetronomeStepper(values, notAValidTempo);

    expect(sut.getNext()).toBe(80);
  });
});
