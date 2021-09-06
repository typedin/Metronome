import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button } from "react-native";
import Container from "./src/layouts/Container";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";

export default function App() {
  const [sound, setSound] = useState<Sound>();

  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/block.wav")
    );
    setSound(sound);
  };

  const unloadSound = async () => {
    if (typeof sound === "undefined") {
      return;
    }
    sound.unloadAsync();
  };

  const playSound = async () => {
    if (typeof sound === "undefined") {
      return;
    }
    await sound.playAsync();
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <Container>
      <Button
        title={sound ? "Unload Sound" : "Load Sound"}
        onPress={loadSound}
      />
      <Button title="Play Sound" onPress={playSound} />
      <StatusBar style="auto" />
    </Container>
  );
}
