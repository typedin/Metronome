import { IValues } from "../services/providers/types";
import { IMetronomeStepper } from "./types";

export default (getValues: IValues, tempo: number): IMetronomeStepper => {
  const values = getValues();

  const closest = (needle: number) =>
    values.reduce((a: number, b: number) => {
      return Math.abs(b - needle) < Math.abs(a - needle) ? b : a;
    });

  const getIndex = function (): number {
    return values.indexOf(closest(tempo));
  };

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
