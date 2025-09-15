import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import { UpdateType, Game } from "./classes/Game";

type GameUpdateContextType = {
  requestUpdate: (u: string) => void;
  tick: number;
  lastUpdateType: string | null;
};

type GameContextType = {
  game: Game | null;
};

const GameUpdateContext = createContext<GameUpdateContextType | null>(null);
const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [tick, setTick] = useState(0);
  const lastUpdateType = useRef<string | null>(null);
  const [game, setGame] = useState<Game | null>(null);

  function requestUpdate(u: string) {
    lastUpdateType.current = u;
    setTick((t) => t + 1);
  }

  useEffect(() => {
    const g = new Game();
    setGame(g);
    Game.requestUpdateHandler = requestUpdate;
    return () => {
      Game.requestUpdateHandler = null;
      setGame(null);
    };
  }, []);

  return (
    <GameUpdateContext.Provider
      value={{ requestUpdate, tick, lastUpdateType: lastUpdateType.current }}>
      <GameContext.Provider value={{ game }}>{children}</GameContext.Provider>
    </GameUpdateContext.Provider>
  );
}

export function useGameUpdate(type: string) {
  const ctx = useContext(GameUpdateContext);
  if (!ctx) throw new Error("Must be inside GameProvider");

  const shouldUpdate =
    ctx.lastUpdateType === type || ctx.lastUpdateType === "all";

  return { shouldUpdate, tick: ctx.tick };
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("Must be inside GameProvider");

  return ctx.game;
}
