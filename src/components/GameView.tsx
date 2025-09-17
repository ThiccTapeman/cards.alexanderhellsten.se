import { useState } from "react";
import { DeckView } from "./DeckView";
import { DiceProvider } from "./DiceContext";
import { GameProvider } from "./GameProvider";
import { OverlayProvider } from "./OverlayProvider";
import { PickCardOverlay } from "./overlays/PickCardView";
import { ButtonCluster } from "./overlays/ButtonCluster";

export default function GameView() {
  return (
    <GameProvider>
      <DiceProvider>
        <DeckView></DeckView>
        <OverlayProvider>
          <PickCardOverlay></PickCardOverlay>
          <ButtonCluster></ButtonCluster>
        </OverlayProvider>
      </DiceProvider>
    </GameProvider>
  );
}
