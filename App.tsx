import React, { useState } from "react";
import createMetronome from "./src/Metronome";
import Container from "./src/layouts/Container";
import { webPlayer } from "./src/services/MetronomeSoundPlayer";
import Maelzel from "./src/services/Maelzel";
import Play from "./src/components/Play";
import SelectTempo from "./src/components/SelectTempo";
import SelectStepper from "./src/components/SelectStepper";
import { NamedStepper } from "./src/services/types";
import OneByOne from "./src/services/OneByOne";
import UpTenDownFive from "./src/services/UpTenDownFive";

const DEFAULT_TEMPO = 60;
const steppers = [
  {
    name: "Maelzel",
    callable: Maelzel,
  },
  {
    name: "One by One",
    callable: OneByOne,
  },
  {
    name: "Up ten down five",
    callable: UpTenDownFive,
  },
];

export default function App() {
  const [tempo, setTempo] = useState(DEFAULT_TEMPO);
  const [stepper, setStepper] = useState(steppers[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [stepperIndex, setStepperIndex] = useState(0);

  const [metronome, setMetronome] = useState(
    createMetronome(tempo, webPlayer, stepper.callable)
  );

  function changeTempo(aChoice: "increaseTempo" | "decreaseTempo") {
    metronome.stop();
    const newTempo = metronome[aChoice]();
    setTempo(newTempo);
    setMetronome(createMetronome(newTempo, webPlayer, stepper.callable));
  }

  function startStop(): void {
    metronome[isRunning ? "stop" : "start"]();
    setIsRunning(metronome.isRunning);
  }

  function onNewIndex(newIndex: number) {
    setStepperIndex(newIndex);
    setStepper(steppers[newIndex]);
    setMetronome(
      createMetronome(tempo, webPlayer, steppers[newIndex].callable)
    );
  }

  return (
    <Container>
      <SelectStepper
        steppers={steppers}
        onNewIndex={onNewIndex}
        currentStepper={stepper}
        stepperIndex={stepperIndex}
      />
      <SelectTempo changeTempo={changeTempo} tempo={tempo} />
      <Play startStop={startStop} isRunning={metronome.isRunning} />
    </Container>
  );
}
