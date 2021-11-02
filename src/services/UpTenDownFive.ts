import { IMetronomeStepper } from "../types";

export default (tempo: number): IMetronomeStepper => {
  const getPrevious = () => undefined;

  let nextStep = "increment";
  let incrementValue = 0;

  const getNext = (): number => {
    if (nextStep === "increment") {
      nextStep = "decrement";
      incrementValue += 10;
    } else if (nextStep === "decrement") {
      nextStep = "increment";
      incrementValue -= 5;
    }
    return tempo + incrementValue;
  };

  return {
    getNext,
    getPrevious,
  };
};
