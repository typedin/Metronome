declare interface IMetronomeStepper {
  getNext: () => number | undefined;
  getPrevious: () => number | undefined;
}

type NamedStepper = {
  name: string;
  callable: (tempo: number) => IMetronomeStepper;
};

export { IMetronomeStepper, NamedStepper };
