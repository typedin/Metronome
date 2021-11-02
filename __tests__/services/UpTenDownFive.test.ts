import UpTenDownFive from "../../src/services/UpTenDownFive";

describe("UpTenDownFive", () => {
  describe("steps", () => {
    it("should never give previous step", function () {
      const tempo = 60;
      const sut = UpTenDownFive(tempo);

      expect(sut.getPrevious()).toBe(undefined);
    });

    it("should give the next step", function () {
      const tempo = 60;
      const sut = UpTenDownFive(tempo);

      expect(sut.getNext()).toBe(70);
      expect(sut.getNext()).toBe(65);
      expect(sut.getNext()).toBe(75);
      expect(sut.getNext()).toBe(70);
    });
  });
});
