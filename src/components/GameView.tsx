import { useState } from "react";
import { DeckView } from "./DeckView";
import { DiceProvider } from "./DiceContext";
import DiceView from "./DiceView";
import { GameProvider } from "./GameProvider";
import { OverlayProvider } from "./OverlayProvider";
import { PickCardOverlay } from "./overlays/PickCardView.overlay";
import { ButtonCluster } from "./overlays/ButtonCluster.overlay";

export default function GameView() {
  const [roll, setRoll] = useState<{ values: any[]; total: number } | null>(
    null
  );

  function onRollDone(values: any[], total: number) {
    setRoll({ values, total });
  }
  return (
    <GameProvider>
      <DiceProvider>
        {roll?.total}
        <DeckView></DeckView>
        <DiceView onRollDone={onRollDone}></DiceView>
        <OverlayProvider>
          <PickCardOverlay></PickCardOverlay>
          <ButtonCluster></ButtonCluster>
        </OverlayProvider>
      </DiceProvider>
    </GameProvider>
  );
}
