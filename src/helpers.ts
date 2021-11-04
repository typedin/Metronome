export const previousStepperIndex = ({
  index,
  arrayLength,
}: {
  index: number;
  arrayLength: number;
}): number => {
  return (arrayLength + index - 1) % arrayLength;
};

export const nextStepperIndex = ({
  index,
  arrayLength,
}: {
  index: number;
  arrayLength: number;
}): number => (index + 1) % arrayLength;
