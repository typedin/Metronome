import React from "react";
import { Pressable, Text } from "react-native";
import tw from "tailwind-react-native-classnames";

function SelectTempo({ changeTempo, tempo }) {
  return (
    <div style={tw`flex flex-row items-center justify-between`}>
      <Pressable onPress={() => changeTempo("decreaseTempo")}>
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
            strokeWidth="2"
            d="M20 12H4"
          ></path>
        </svg>
      </Pressable>
      <div style={tw`px-8 border border-gray-900`}>
        <Text>{tempo}</Text>
      </div>
      <Pressable onPress={() => changeTempo("increaseTempo")}>
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
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
      </Pressable>
    </div>
  );
}

export default SelectTempo;
