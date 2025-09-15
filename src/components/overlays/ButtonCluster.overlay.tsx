import { useOverlay } from "../OverlayProvider";

export function ButtonCluster() {
  const overlay = useOverlay("button_cluster", true);
  function onPickCard() {
    overlay.open("pick_a_card");
  }

  function onRollDice() {}
  return (
    <div className="flex">
      <button onClick={onPickCard}>DECK VIEW</button>
    </div>
  );
}
