// DiceView.jsx
import React, { useEffect, useRef, useState } from "react";

export function DiceView({ dice, onRolls, onRollComplete, offset = 100 }) {
  const containerRef = useRef(null);
  const [rolls, setRolls] = useState([]);

  useEffect(() => {
    onRolls?.(rolls.map((d) => d.value));
  }, [rolls, onRolls]);

  useEffect(() => {
    if (!containerRef.current) return;
    const containerId = containerRef.current.id;

    dice.init(containerId).then(() => {
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      dice.diceBox.onBeforeRoll = () => {
        setRolls([]);
        onRollComplete?.(false);
      };
      dice.diceBox.onDieComplete = (result) => {
        setRolls((prev) => [...prev, result]);
      };
      dice.diceBox.onRollComplete = () => {
        onRollComplete?.(true);
      };
    });

    function resizeCanvas() {
      if (!dice.diceBox?.canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      dice.diceBox.canvas.width = rect.width;
      dice.diceBox.canvas.height = rect.height;
      dice.diceBox.canvas.style.width = "100%";
      dice.diceBox.canvas.style.height = "100%";
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [dice, onRollComplete]);

  useEffect(() => {
    function updateHeight() {
      if (!containerRef.current) return;
      const h = window.innerHeight - offset;
      containerRef.current.style.height = `${h}px`;
    }
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [offset]);

  return (
    <div
      ref={containerRef}
      id="dice-box-container"
      style={{ width: "100%", position: "relative" }}
    />
  );
}
