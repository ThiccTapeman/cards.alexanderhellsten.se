// DeckView.tsx
import React from "react";
import { useGame, useGameUpdate } from "./GameProvider";
import { UpdateType } from "./classes/Game";
import { Deck } from "./classes/deck/Deck";
import { CardView } from "./CardView";

export function DeckView() {
  const { shouldUpdate, tick } = useGameUpdate(UpdateType.Deck);
  const game = useGame();

  if (!game) return;

  return (
    <div>
      <div>Deck Component</div>
      {game.deck &&
        game.deck.cards.map((c) => <CardView card={c.base}></CardView>)}
      {shouldUpdate && <div>Deck Updated (tick {tick})</div>}
    </div>
  );
}
