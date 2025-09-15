// DeckView.tsx
import React from "react";
import { useGame, useGameUpdate } from "./GameProvider";
import { UpdateType } from "./classes/Game";
import { Deck } from "./classes/deck/Deck";
import { CardView } from "./CardView";

export function DeckView() {
  const { shouldUpdate, tick } = useGameUpdate("deck");
  const game = useGame();

  if (!game) return;

  return (
    <div>
      <div>Deck Component</div>
      <div className="grid grid-cols-3 gap-5">
        {game.deck &&
          game.deck.cards.map((c) => (
            <CardView card={c.base} key={`${c.data?.title}_VIEW`}></CardView>
          ))}
      </div>

      {shouldUpdate && <div>Deck Updated (tick {tick})</div>}
    </div>
  );
}
