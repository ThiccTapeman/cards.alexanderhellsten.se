import React from "react";
import { useDice } from "../../DiceContext";
import { Plane, Play } from "lucide-react";
import { Game } from "../../classes/Game";
import { useGame } from "../../GameProvider";
import { RollResult } from "@3d-dice/dice-box";
import { Dice } from "../../classes/dice/Dice";
import { ErrorHandler, ErrorType } from "../../classes/ErrorHandler";

export function RollDiceButton() {
  const { roll } = useDice();
  const game = useGame();

  async function handleRoll() {
    const dice = Dice.instance;
    if (!dice.CanRoll()) return;

    dice.SetCanRoll(false);
    const results = await roll(2, "pip"); // qty, sides

    const values = results.map((r) => r.value);
    const total = results.reduce((sum, r) => sum + r.value, 0);

    dice.Set(values, total);

    dice.onRollCompleted.Call();
  }

  return (
    <button onClick={handleRoll}>
      <Play></Play>
    </button>
  );
}
