import { Book, Play } from "lucide-react";
import { useOverlay } from "../OverlayProvider";
import { RollDiceButton } from "./buttons/RollDiceButton";

export function ButtonCluster() {
  const overlay = useOverlay("button_cluster", true);
  function onPickCard() {
    overlay.open("pick_a_card");
  }

  function onRollDice() {}
  return (
    <div className="flex pointer-events-auto absolute bottom-0">
      <RollDiceButton></RollDiceButton>
      <button onClick={onPickCard}>
        <Book></Book>
      </button>
    </div>
  );
}
