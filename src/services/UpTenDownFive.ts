import { IMetronomeStepper } from "./types";

export default (tempo: number): IMetronomeStepper => {
  const getPrevious = (): number => (tempo -= 5);
  const getNext = (): number => (tempo += 10);

  return {
    getNext,
    getPrevious,
  };
};
