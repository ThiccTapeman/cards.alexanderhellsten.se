import { useOverlay } from "../OverlayProvider";

export function PickCardOverlay() {
  const overlay = useOverlay("pick_a_card");

  function onClose() {
    overlay.close();
  }

  if (!overlay.isActive) return null;
  return (
    <div className="w-full h-full bg-black">
      <button onClick={onClose}>Close</button>
    </div>
  );
}
