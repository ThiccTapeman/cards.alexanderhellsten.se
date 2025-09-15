import { CardView } from "../CardView";
import { useGame, useGameUpdate } from "../GameProvider";
import { useOverlay } from "../OverlayProvider";

export function PickCardOverlay() {
  const overlay = useOverlay("pick_a_card");
  const update = useGameUpdate("choices");
  const game = useGame();

  function onClose() {
    overlay.close();
  }

  function onDraw() {
    game?.deck.GetRandomChoices(3);
  }

  if (!overlay.isActive) return null;
  return (
    <div className="w-screen h-screen bg-black pointer-events-auto">
      <button onClick={onClose}>Close</button>

      {game?.deck?.choices?.length && game?.deck?.choices?.length > 1 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {game?.deck.choices.map((c) => (
            <CardView card={c}></CardView>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <button onClick={onDraw}>Draw</button>
        </div>
      )}
    </div>
  );
}
