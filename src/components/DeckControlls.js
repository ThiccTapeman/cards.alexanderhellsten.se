import { useState } from "react";
import AnimatedScore from "./AnimatedScore";
import { Play } from "lucide-react";
import { CardPicker } from "./CardPicker";

export function DeckControlls({
  dice,
  deck,
  currency,
  rolls,
  rollComplete,
  game,
}) {
  const [steps, setSteps] = useState([]);
  const [value, setValue] = useState(0);
  const [runId, setRunId] = useState(0);

  async function handleRoll() {
    const Dices = deck.GetDeckCastData("Dices", null).Calculate(false) + 1;
    const r = await dice.Roll(Dices);

    const rollsteps = deck.GetDeckCastData("Roll", r);
    setSteps(rollsteps.WithdrawSteps());
    currency.Add(rollsteps.Calculate(true) * r.Value());
    setValue(r.Value());
    game.SaveGame();
    setRunId((id) => id + 1);
  }

  function addNewCardToDeck(selected) {
    deck.AddCard(selected.title, 1);
  }

  return (
    <>
      <AnimatedScore
        key={runId}
        base={value}
        steps={steps}
        interval={500}
        rolls={rolls}
        rollComplete={rollComplete}
      />
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-10">
        <div className="flex justify-center items-center pb-10">
          <button
            className="aspect-square p-7 rounded-full hover:bg-amber-200 bg-amber-400 text-black font-bold"
            onClick={handleRoll}>
            <Play size={35}></Play>
          </button>
        </div>
        <div className="w-full">
          <div className=""></div>
        </div>
      </div>
    </>
  );
}
