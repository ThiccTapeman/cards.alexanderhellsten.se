import React from "react";
import { useDice } from "../../DiceContext";
import { Plane, Play } from "lucide-react";
import { Game } from "../../classes/Game";
import { useGame } from "../../GameProvider";
import { RollResult } from "@3d-dice/dice-box";

export function RollDiceButton() {
  const { roll } = useDice();
  const game = useGame();

  async function handleRoll() {
    const results = await roll(2, "pip"); // qty, sides
    if (!results.length) return;

    const {
      type = "",
      result = 0,
      rolls = [],
      notation = "",
    } = results[0] ?? {};
    console.log(type, result, rolls, notation);
  }

  function onRollComplete(result: RollResult) {
    console.log(result);
  }

  return (
    <button onClick={handleRoll}>
      <Play></Play>
    </button>
  );
}
