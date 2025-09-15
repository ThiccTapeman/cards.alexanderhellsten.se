import { Book, Play } from "lucide-react";
import { useOverlay } from "../OverlayProvider";

export function ButtonCluster() {
  const overlay = useOverlay("button_cluster", true);
  function onPickCard() {
    overlay.open("pick_a_card");
  }

  function onRollDice() {}
  return (
    <div className="flex">
      <button onClick={onRollDice}>
        <Play></Play>
      </button>
      <button onClick={onPickCard}>
        <Book></Book>
      </button>
    </div>
  );
}
