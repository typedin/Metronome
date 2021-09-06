import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import Container from "./src/layouts/Container";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import tw from "tailwind-react-native-classnames";
import BpmToMS from "./src/services/BpmToMS";

type State = {
  intervalID: any | null;
  isPlaying: boolean;
  loopInterval: number;
  sound: Sound | null;
  tempo: Bpm;
};

export default function App() {
  const DEFAULT_TEMPO = 60;
  const [state, setState] = useState<State>({
    intervalID: null,
    isPlaying: false,
    loopInterval: BpmToMS({ bpm: DEFAULT_TEMPO }).toMS(),
    sound: null,
    tempo: DEFAULT_TEMPO,
  });

  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/block.wav")
    );
    setState({ ...state, sound });
  };

  const playSound = async () => {
    if (!state.sound) {
      return;
    }
    await state.sound.playAsync();
  };

  const play = () => {
    const id = setInterval(playSound, state.loopInterval);
    setState({ ...state, intervalID: id, isPlaying: true });
  };

  const stop = () => {
    clearInterval(state.intervalID);
    setState({ ...state, intervalID: null, isPlaying: false });
  };

  useEffect(() => {
    loadSound();
  }, []);

  useEffect(() => {
    return !state.sound
      ? () => {
          if (state.sound) state.sound.unloadAsync();
        }
      : undefined;
  }, [state.sound]);

  const changeTempo = ({ action }: { action: string }) => {
    const tempo = action === "increment" ? state.tempo + 1 : state.tempo - 1;

    setState({
      ...state,
      tempo,
      loopInterval: BpmToMS({
        bpm: tempo,
      }).toMS(),
    });
  };

  return (
    <Container isLoaded={!!state.sound}>
      <View style={tw`w-48 flex flex-row justify-between items-center`}>
        <Pressable
          style={tw`rounded shadow`}
          onPress={() => changeTempo({ action: "decrement" })}
        >
          <svg
            style={tw`w-6 h-6`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            />
          </svg>
        </Pressable>
        <View>{state.tempo}</View>
        <Pressable
          onPress={() => changeTempo({ action: "increment" })}
          style={tw`rounded shadow`}
        >
          <svg
            style={tw`w-6 h-6`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            />
          </svg>
        </Pressable>
      </View>
      <Pressable onPress={state.isPlaying ? stop : play} style={tw`mt-16`}>
        <svg
          style={tw`w-16 h-16`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          {state.isPlaying ? (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
            />
          ) : (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            />
          )}
        </svg>
      </Pressable>
      <StatusBar style="auto" />
    </Container>
  );
}
