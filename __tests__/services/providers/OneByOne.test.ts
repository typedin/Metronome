import OneByOne from "../../../src/services/providers/OneByOne";

describe("OneByOne", () => {
  describe("steps", () => {
    it("should give the previous step", function () {
      const tempo = 60;
      const sut = OneByOne(tempo);

      expect(sut.getPrevious()).toBe(59);
    });

    it("can give many previous steps in a row", function () {
      const tempo = 60;
      const sut = OneByOne(tempo);

      expect(sut.getPrevious()).toBe(59);
      expect(sut.getPrevious()).toBe(58);
      expect(sut.getPrevious()).toBe(57);
    });

    it("should give the next step", function () {
      const tempo = 60;
      const sut = OneByOne(tempo);

      expect(sut.getNext()).toBe(61);
      expect(sut.getNext()).toBe(62);
      expect(sut.getNext()).toBe(63);
    });

    it("should not go beyond lower limit", function () {
      const tooLow = 20;
      const sut = OneByOne(tooLow);

      expect(sut.getPrevious()).toBe(undefined);
      expect(sut.getNext()).toBe(21);
      expect(sut.getNext()).toBe(22);
    });

    it("should not go beyond lower limit but keep track with the next tempo", function () {
      const tooLow = 20;
      const sut = OneByOne(tooLow);

      expect(sut.getPrevious()).toBe(undefined);
      expect(sut.getNext()).toBe(21);
      expect(sut.getNext()).toBe(22);
    });

    it("should not go beyond upper limit", function () {
      const tooHigh = 281;
      const sut = OneByOne(tooHigh);

      expect(sut.getNext()).toBe(undefined);
      expect(sut.getPrevious()).toBe(280);
      expect(sut.getPrevious()).toBe(279);
    });

    it("should not go beyond upper limit but should keep track with the previous tempo", function () {
      const tooHigh = 281;
      const sut = OneByOne(tooHigh);

      expect(sut.getNext()).toBe(undefined);
      expect(sut.getPrevious()).toBe(280);
      expect(sut.getPrevious()).toBe(279);
    });
  });
});
