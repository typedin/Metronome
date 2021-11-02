import BinaryTernarySwitcher from "../../src/services/BinaryTernarySwitcher";

describe("BinaryTernarySwitcher", () => {
  describe("toTriplets", () => {
    it("should give 80 when tempo is 60", function () {
      const tempo = 60;
      const sut = BinaryTernarySwitcher(tempo);

      expect(sut.toTriplets()).toBe(80);
    });

    it("should give 160 when tempo is 120", function () {
      const tempo = 120;
      const sut = BinaryTernarySwitcher(tempo);

      expect(sut.toTriplets()).toBe(160);
    });

    describe("rounding", () => {
      it("should give 61 when tempo is 46", function () {
        const tempo = 46;
        const sut = BinaryTernarySwitcher(tempo);

        expect(sut.toTriplets()).toBe(61);
      });
    });
  });

  describe("toQuarters", () => {
    it("should give 60 when tempo is 80", function () {
      const tempo = 80;
      const sut = BinaryTernarySwitcher(tempo);

      expect(sut.toQuarters()).toBe(60);
    });

    it("should give 120 when tempo is 160", function () {
      const tempo = 160;
      const sut = BinaryTernarySwitcher(tempo);

      expect(sut.toQuarters()).toBe(120);
    });

    describe("rounding", () => {
      it("should give 46 when tempo is 61", function () {
        const tempo = 61;
        const sut = BinaryTernarySwitcher(tempo);

        expect(sut.toQuarters()).toBe(46);
      });
    });
  });
});
