import BpmToMS from "../../src/services/BpmToMS";

describe("BpmToMS", () => {
  it("sets 60 to 1000 ms", async () => {
    const sut = new BpmToMS({ tempo: 60 });
    expect(sut.toMS()).toEqual(1000);
  });

  it("sets 80 to 750 ms", async () => {
    const sut = new BpmToMS({ tempo: 80 });
    expect(sut.toMS()).toEqual(750);
  });

  it("sets 100 to 600 ms", async () => {
    const sut = new BpmToMS({ tempo: 100 });
    expect(sut.toMS()).toEqual(600);
  });

  it("sets 86 to 698 ms", async () => {
    const sut = new BpmToMS({ tempo: 86 });
    expect(sut.toMS()).toEqual(698);
  });

  it("sets 168 to 357 ms", async () => {
    const sut = new BpmToMS({ tempo: 168 });
    expect(sut.toMS()).toEqual(357);
  });
});
