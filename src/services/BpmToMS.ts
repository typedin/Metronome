type Applesauce = {
  bpm: number;
};

const NB_OF_MILLISECONDS_IN_ONE_MINUTE = 60000;

export default (args: Applesauce) => {
  return {
    toMS: () => Math.round(NB_OF_MILLISECONDS_IN_ONE_MINUTE / args.bpm) | 0,
  };
};
