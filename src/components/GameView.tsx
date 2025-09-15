import { DeckView } from "./DeckView";
import { GameProvider } from "./GameProvider";

export default function GameView() {
  return (
    <GameProvider>
      <DeckView></DeckView>
    </GameProvider>
  );
}
