import React from "react";
import { Text, Pressable } from "react-native";
import tw from "tailwind-react-native-classnames";
import { previousStepperIndex, nextStepperIndex } from "../helpers";
import { NamedStepper } from "../services/types";

function SelectStepper({
  onNewIndex,
  steppers,
  stepperIndex,
  currentStepper,
}: {
  onNewIndex: Function;
  steppers: NamedStepper[];
  stepperIndex: number;
  currentStepper: NamedStepper;
}) {
  function setPreviousStepper() {
    const newIndex = previousStepperIndex({
      index: stepperIndex,
      arrayLength: steppers.length,
    });
    onNewIndex(newIndex);
  }

  function setNextStepper() {
    const newIndex = nextStepperIndex({
      index: stepperIndex,
      arrayLength: steppers.length,
    });
    onNewIndex(newIndex);
  }

  return (
    <div style={tw`flex flex-row items-center justify-between`}>
      <Pressable onPress={() => setPreviousStepper()}>
        <svg
          style={tw`w-6 h-6`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
          />
        </svg>
      </Pressable>
      <div style={tw`mx-6`}>
        <Text>{currentStepper.name}</Text>
      </div>
      <Pressable onPress={() => setNextStepper()}>
        <svg
          style={tw`w-6 h-6`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </Pressable>
    </div>
  );
}

export default SelectStepper;
