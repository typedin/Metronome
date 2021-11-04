import React, { useState } from "react";
import Maelzel from "../services/Maelzel";
import { Text, Pressable, LogBox } from "react-native";
import tw from "tailwind-react-native-classnames";
import OneByOne from "../services/OneByOne";
import { previousStepperIndex, nextStepperIndex } from "../helpers";

function SelectStepper({ changeStepper }) {
  const steppers = [
    {
      name: "Maelzel",
      function: Maelzel,
    },
    {
      name: "One by One",
      function: OneByOne,
    },
  ];
  let [stepperIndex, setStepperIndex] = useState(0);
  const [stepper, setStepper] = useState(steppers[0]);

  function setPreviousStepper() {
    const newIndex = previousStepperIndex({
      index: stepperIndex,
      arrayLength: steppers.length,
    });
    setStepperIndex(newIndex);
    setStepper(steppers[newIndex]);
  }
  function setNextStepper() {
    const newIndex = nextStepperIndex({
      index: stepperIndex,
      arrayLength: steppers.length,
    });
    setStepperIndex(newIndex);
    setStepper(steppers[newIndex]);
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
      <div className={tw`mx-6`}>
        <Text>{stepper.name}</Text>
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
