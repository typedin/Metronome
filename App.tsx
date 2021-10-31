import Metronome from "./src/MetronomeClass";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Pressable, View, Text } from "react-native";
import Container from "./src/layouts/Container";
import tw from "tailwind-react-native-classnames";
import BpmToMS from "./src/services/BpmToMS";

type State = {
  intervalID: any | null;
  isPlaying: boolean;
  loopInterval: number;
  tempo: Bpm;
};

const DEFAULT_TEMPO = 60;
export default function App() {
  const metronome = new Metronome(DEFAULT_TEMPO);

  const [state, setState] = useState<State>({
    intervalID: null,
    isPlaying: false,
    loopInterval: 1000,
    tempo: DEFAULT_TEMPO,
  });

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
    <Container>
      <Pressable
        onPress={() =>
          metronome.isRunning ? metronome.stop() : metronome.start()
        }
        style={tw`mt-16`}
      >
        <Text>Here</Text>
      </Pressable>
    </Container>
  );
}
