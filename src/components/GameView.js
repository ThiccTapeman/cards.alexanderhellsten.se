import { useEffect, useState } from "react";
import { GameManager } from "./classes/GameManager";
import { DeckView } from "./classes/Deck";
import { DiceView } from "./DiceView";
import { DeckControlls } from "./DeckControlls";
import { CurrencyView } from "./CurrencyView";

export default function GameView() {
  const [game, setGame] = useState(null);
  const [rolls, setRolls] = useState([]);
  const [rollComplete, setRollComplete] = useState(false);

  useEffect(() => {
    const gm = GameManager.LoadGame();
    setGame(gm);
  }, []);

  if (!game) {
    return <div>Loading...</div>; // avoids hydration mismatch
  }

  return (
    <div>
      <CurrencyView currency={game.cash} />
      <DeckControlls
        dice={game.dice}
        deck={game.deck}
        currency={game.cash}
        rolls={rolls}
        rollComplete={rollComplete}
        game={game}
      />
      <DiceView
        dice={game.dice}
        onRolls={setRolls}
        onRollComplete={setRollComplete}
      />
      <DeckView deck={game.deck} />
    </div>
  );
}
