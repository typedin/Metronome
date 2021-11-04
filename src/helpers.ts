export const nextStepperIndex = ({
  index,
  arrayLength,
}: {
  index: number;
  arrayLength: number;
}): number => (index + 1) % arrayLength;

export const previousStepperIndex = ({
  index,
  arrayLength,
}: {
  index: number;
  arrayLength: number;
}): number => (arrayLength + index - 1) % arrayLength;
