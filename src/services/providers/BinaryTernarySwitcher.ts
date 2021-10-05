const CONSTANT = 4 / 3;

export default (tempo: number): any => {
  const round = (aNumber: number): Number => Math.round(aNumber);

  const toTriplets = (): Number => round(tempo * CONSTANT);

  const toQuarters = (): Number => round(tempo / CONSTANT);

  return {
    toTriplets,
    toQuarters,
  };
};
