import { useState } from "react";
import { DeckView } from "./DeckView";
import { DiceProvider } from "./DiceContext";
import { GameProvider } from "./GameProvider";
import { OverlayProvider } from "./OverlayProvider";
import { PickCardOverlay } from "./overlays/PickCardView.overlay";
import { ButtonCluster } from "./overlays/ButtonCluster.overlay";

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
