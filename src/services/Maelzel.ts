import { IMetronomeStepper } from "./types";

export default (tempo: number): IMetronomeStepper => {
  const values = [
    40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 63, 66, 69, 72, 72, 76, 80, 84,
    88, 92, 96, 100, 104, 108, 112, 116, 120, 144, 152, 160, 168, 176, 184, 192,
    200, 208,
  ];

  const closest = (needle: number) =>
    values.reduce((a: number, b: number) => {
      return Math.abs(b - needle) < Math.abs(a - needle) ? b : a;
    });

  const getIndex = (): number => values.indexOf(closest(tempo));

  const getPrevious = (): number | undefined => {
    const index = getIndex();
    if (index === -1) {
      return undefined;
    }
    return values[index - 1];
  };

  const getNext = (): number | undefined => {
    const index = getIndex();
    if (index === -1) {
      return undefined;
    }
    return values[index + 1];
  };

  return {
    getNext,
    getPrevious,
  };
};
