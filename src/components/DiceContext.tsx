// DiceContext.tsx
import React, { createContext, useContext, useRef, useEffect } from "react";
import DiceBox, { RollResult } from "@3d-dice/dice-box";

type DiceContextType = {
  roll: (qty: number, sides: number | string) => Promise<RollResult[]>;
};

const DiceContext = createContext<DiceContextType | null>(null);

export const useDice = () => {
  const ctx = useContext(DiceContext);
  if (!ctx) throw new Error("useDice must be used inside <DiceProvider>");
  return ctx;
};

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
        themeColor: "#ffffff",
        scale: 6,
      });

      box.init().then(() => {
        diceRef.current = box;

        if (onDieComplete) {
          box.onDieComplete = onDieComplete;
        }
        if (onRollComplete) {
          box.onRollComplete = onRollComplete;
        }
      });
    }
  }, [containerId, onDieComplete, onRollComplete]);

  const roll = async (qty: number, sides: number | string) => {
    if (!diceRef.current) return [];
    const notation = `${qty}d${sides}`;
    const result = diceRef.current.roll(notation);
    console.log(result);
    return result;
  };

  return (
    <DiceContext.Provider value={{ roll }}>
      <div id={containerId} style={{ width: "100%", height: 400 }} />
      {children}
    </DiceContext.Provider>
  );
};
