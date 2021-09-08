const NB_OF_MILLISECONDS_IN_ONE_MINUTE = 60000;

export default (args: any) => {
  return {
    toMS: () => Math.round(NB_OF_MILLISECONDS_IN_ONE_MINUTE / args.tempo) | 0,
  };
};
