import React, { useState } from "react";
import createMetronome from "./src/Metronome";
import Container from "./src/layouts/Container";
import { webPlayer } from "./src/services/MetronomeSoundPlayer";
import Maelzel from "./src/services/Maelzel";
import Play from "./src/components/Play";
import SelectTempo from "./src/components/SelectTempo";
import SelectStepper from "./src/components/SelectStepper";
import { IMetronomeStepper } from "./src/services/types";

const DEFAULT_TEMPO = 60;
const DEFAULT_STEPPER = Maelzel;
export default function App() {
  let [tempo, setTempo] = useState(DEFAULT_TEMPO);
  let stepper = DEFAULT_STEPPER;
  const [metronome, setMetronome] = useState(
    createMetronome(tempo, webPlayer, stepper)
  );

  const [isRunning, setIsRunning] = useState(false);

  const changeStepper = function (
    aStepper: (tempo: number) => IMetronomeStepper
  ) {
    stepper = aStepper;
  };
  const changeTempo = function (aChoice: "increaseTempo" | "decreaseTempo") {
    metronome.stop();
    const newTempo = metronome[aChoice]();
    setTempo(newTempo);
    setMetronome(createMetronome(newTempo, webPlayer, Maelzel));
  };

  const startStop = function (): void {
    metronome[isRunning ? "stop" : "start"]();
    setIsRunning(metronome.isRunning);
  };

  return (
    <Container>
      <SelectStepper changeStepper={changeStepper} />
      <SelectTempo changeTempo={changeTempo} tempo={tempo} />
      <Play startStop={startStop} isRunning={metronome.isRunning} />
    </Container>
  );
}
