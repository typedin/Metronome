import { previousStepperIndex, nextStepperIndex } from "../src/helpers";

describe("previousStepperIndex", () => {
  it("can give next index", () => {
    const result = previousStepperIndex({ index: 1, arrayLength: 8 });

    expect(result).toBe(0);
  });

  it("can give next index when exeeding the arrayLength", () => {
    const inputs = [
      {
        index: 0,
        arrayLength: 2,
        expectedResult: 1,
      },
      {
        index: 0,
        arrayLength: 4,
        expectedResult: 3,
      },
    ];
    inputs.forEach(({ index, arrayLength, expectedResult }) => {
      expect(previousStepperIndex({ index, arrayLength })).toBe(expectedResult);
    });
  });
});
describe("nextStepper", () => {
  it("can give next index", () => {
    const result = nextStepperIndex({ index: 1, arrayLength: 8 });

    expect(result).toBe(2);
  });

  it("can give next index when exeeding the arrayLength", () => {
    const inputs = [
      {
        index: 7,
        arrayLength: 8,
        expectedResult: 0,
      },
      {
        index: 0,
        arrayLength: 2,
        expectedResult: 1,
      },
    ];
    inputs.forEach(({ index, arrayLength, expectedResult }) => {
      expect(nextStepperIndex({ index, arrayLength })).toBe(expectedResult);
    });
  });
});
