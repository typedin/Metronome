import BpmToMS from "../../src/services/BpmToMS";

describe("BpmToMS", () => {
  it("sets 60 bpm to 1000 ms", async () => {
    const sut = new BpmToMS({ bpm: 60 });
    expect(sut.toMS()).toEqual(1000);
  });

  it("sets 80 bpm to 750 ms", async () => {
    const sut = new BpmToMS({ bpm: 80 });
    expect(sut.toMS()).toEqual(750);
  });

  it("sets 100 bpm to 600 ms", async () => {
    const sut = new BpmToMS({ bpm: 100 });
    expect(sut.toMS()).toEqual(600);
  });

  it("sets 86 bpm to 698 ms", async () => {
    const sut = new BpmToMS({ bpm: 86 });
    expect(sut.toMS()).toEqual(698);
  });
});
