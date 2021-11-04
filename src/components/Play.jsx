import React from "react";
import { Pressable, Text } from "react-native";
import tw from "tailwind-react-native-classnames";

function Play({ isRunning, startStop }) {
  return (
    <Pressable onPress={startStop}>
      {isRunning && (
        <svg
          style={tw`w-9 h-9`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      )}
      {!isRunning && (
        <svg
          style={tw`w-9 h-9`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      )}
      <Text style={tw`flex flex-row justify-center items-center`}>
        <span style={tw`font-bold text-gray-800`}>
          {isRunning ? "Stop" : "Start"}
        </span>
      </Text>
    </Pressable>
  );
}
export default Play;
