import { IMetronomeStepper } from "../types";

const LOWER_LIMIT = 20;
const UPPER_LIMIT = 280;
const range = UPPER_LIMIT - LOWER_LIMIT + 1;

const getValues = () => [...Array(range).keys()].map((i) => i + LOWER_LIMIT);

export default (tempo: number): IMetronomeStepper => {
  const values = getValues();
  let globalPreviousIndex: number;

  const closest = (needle: number) =>
    values.reduce((a: number, b: number) => {
      return Math.abs(b - needle) < Math.abs(a - needle) ? b : a;
    });

  const getIndex = (modifier: number): any => {
    const index = values.indexOf(closest(tempo));
    if (index === -1) {
      return -1;
    }
    return globalPreviousIndex
      ? globalPreviousIndex + modifier
      : index + modifier;
  };

  const getValueByIndex = (index: number) => {
    if (index !== -1) {
      globalPreviousIndex = index;
    }
    return values[index];
  };

  const getPrevious = (): number | undefined => getValueByIndex(getIndex(-1));

  const getNext = (): number | undefined => getValueByIndex(getIndex(1));

  return {
    getNext,
    getPrevious,
  };
};
