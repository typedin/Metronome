import UpTenDownFive from "../../src/services/UpTenDownFive";

describe("UpTenDownFive", () => {
  describe("steps", () => {
    it("should never give previous step", function () {
      const tempo = 60;
      const sut = UpTenDownFive(tempo);

      expect(sut.getPrevious()).toBe(55);
      expect(sut.getPrevious()).toBe(50);
    });

    it("should give the next step", function () {
      const tempo = 60;
      const sut = UpTenDownFive(tempo);

      expect(sut.getNext()).toBe(70);
      expect(sut.getNext()).toBe(80);
    });
  });
});
