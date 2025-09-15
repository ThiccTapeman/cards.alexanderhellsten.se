// DiceContext.tsx
import React, { createContext, useContext, useRef, useEffect } from "react";
import DiceBox from "@3d-dice/dice-box";

import type { RollResult } from "@3d-dice/dice-box";

type DiceContextType = {
  roll: (notation?: string) => Promise<RollResult | any[]>;
};

const DiceContext = createContext<DiceContextType | null>(null);

export const useDice = () => {
  const ctx = useContext(DiceContext);
  if (!ctx) throw new Error("useDice must be used inside <DiceProvider>");
  return ctx;
};

// DiceContext.tsx
type ProviderProps = {
  children: React.ReactNode;
  containerId?: string;
  onDieComplete?: (die: { sides: number | string; value: number }) => void;
  onRollComplete?: (results: RollResult[]) => void;
};

export const DiceProvider = ({
  children,
  containerId = "dice-container",
  onDieComplete,
  onRollComplete,
}: ProviderProps) => {
  const diceRef = useRef<DiceBox | null>(null);

  useEffect(() => {
    if (!diceRef.current) {
      const box = new DiceBox(`#${containerId}`, {
        theme: "smooth-pip",
        scale: 6,
      });
      box.init().then(() => {
        diceRef.current = box;

        if (onDieComplete) {
          box.onDieComplete = (die) => {
            onDieComplete(die);
          };
        }
        if (onRollComplete) {
          box.onRollComplete = (results) => {
            onRollComplete(results);
          };
        }
      });
    }
  }, [containerId]);

  const roll = async (notation = "2dpip") => {
    if (!diceRef.current) return [];
    return diceRef.current.roll(notation);
  };

  return (
    <DiceContext.Provider value={{ roll }}>
      <div id={containerId} style={{ width: "100%", height: 400 }} />
      {children}
    </DiceContext.Provider>
  );
};
