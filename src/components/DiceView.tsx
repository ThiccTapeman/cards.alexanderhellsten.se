import React from "react";
import { useDice } from "./DiceContext";
import type { RollResult } from "@3d-dice/dice-box";

type Props = {
  onRollDone?: (values: number[], total: number) => void;
  onDieDone?: (value: number) => void;
};

const DiceView = ({ onRollDone, onDieDone }: Props) => {
  const { roll } = useDice();

  const handleRoll = async () => {
    const results = await roll("2pip");
    if (!Array.isArray(results) || results.length === 0) return;

    console.log("Dice results:", results);

    // Case A: library returns array with one object containing { rolls, total }
    if ("rolls" in results[0]) {
      const result = results[0] as {
        rolls: { value: number }[];
        total: number;
      };
      const values = result.rolls.map((r) => r.value);
      const total = result.total;
      if (onDieDone) values.forEach((v) => onDieDone(v));
      if (onRollDone) onRollDone(values, total);
      return;
    }

    // Case B: library returns flat array of dice
    if ("value" in results[0]) {
      const values = (results as { value: number }[]).map((r) => r.value);
      const total = values.reduce((a, b) => a + b, 0);
      if (onDieDone) values.forEach((v) => onDieDone(v));
      if (onRollDone) onRollDone(values, total);
      return;
    }

    console.warn("Unexpected dice result shape:", results);
  };

  return (
    <>
      <button onClick={handleRoll}>Roll Dice</button>;
    </>
  );
};

export default DiceView;
