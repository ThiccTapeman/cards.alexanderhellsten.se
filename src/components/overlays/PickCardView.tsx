import { useState } from "react";
import { CardView } from "../CardView";
import { useGame, useGameUpdate } from "../GameProvider";
import { useOverlay } from "../OverlayProvider";
import { CloseButton } from "./buttons/CloseButton";
import { Card } from "../classes/card/Card";

export function PickCardOverlay() {
  const overlay = useOverlay("pick_a_card");
  const game = useGame();

  function onDraw() {
    game?.deck.GetRandomChoices(3);
  }

  function onClick(idx: number) {
    const choice = game?.deck.choices[idx];
    if (!choice) return;
    if (!choice.data?.title) return;

    game?.deck && (game.deck.choices = []);
    game?.deck.AddCard(choice.data?.title, 1);

    overlay.close();
  }

  if (!overlay.isActive) return null;
  return (
    <div className="w-screen h-screen bg-black/50 backdrop-blur-xl pointer-events-auto">
      <div className="container mx-auto flex items-center justify-center h-full">
        <CloseButton closeName="pick_a_card"></CloseButton>
        {game?.deck.choices?.length ?? 0 > 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {game?.deck.choices.map((c, idx) => (
              <CardView
                card={c}
                key={`PICK_CARD_${idx}`}
                onClick={() => onClick(idx)}></CardView>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <button onClick={onDraw}>Draw</button>
            <p>{game?.deck && <>{game?.deck.choices}</>}</p>
          </div>
        )}
      </div>
    </div>
  );
}
