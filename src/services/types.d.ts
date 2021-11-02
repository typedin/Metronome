declare interface IValues {
  (): number[];
}

declare interface IMetronomeStepper {
  getNext: () => number | undefined;
  getPrevious: () => number | undefined;
}

export { IValues, IMetronomeStepper };
