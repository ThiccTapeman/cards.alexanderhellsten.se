// AnimatedScore.jsx
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedScore({
  base = 1,
  steps = [],
  interval = 1000,
  rolls = [],
  rollComplete = false,
  preSumDelay = 1000, // show "4 + 2 + 6" for 1s
  preStepDelay = 0, // then show "12" for 1s before multipliers
}) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("collecting"); // collecting | holdPlus | sumPause | stepping
  const diceSum = useMemo(() => rolls.reduce((a, b) => a + b, 0), [rolls]);

  // reset on new roll start
  useEffect(() => {
    if (!rollComplete) {
      setPhase("collecting");
      setIndex(0);
    }
  }, [rollComplete, rolls]);

  // move to holdPlus when roll finishes
  useEffect(() => {
    if (!rollComplete) return;
    setPhase("holdPlus");
  }, [rollComplete]);

  // hold "4 + 2 + 6" for preSumDelay, then show sum for preStepDelay
  useEffect(() => {
    if (phase !== "holdPlus") return;
    const t = setTimeout(() => setPhase("sumPause"), preSumDelay);
    return () => clearTimeout(t);
  }, [phase, preSumDelay]);

  useEffect(() => {
    if (phase !== "sumPause") return;
    const t = setTimeout(() => setPhase("stepping"), preStepDelay);
    return () => clearTimeout(t);
  }, [phase, preStepDelay]);

  // step loop starts only in stepping phase
  useEffect(() => {
    if (phase !== "stepping") return;
    if (index >= steps.length) return;
    const t = setTimeout(() => setIndex((i) => i + 1), interval);
    return () => clearTimeout(t);
  }, [phase, index, steps.length, interval]);

  // calculate score from diceSum then apply multipliers up to index
  const score = useMemo(() => {
    let value = diceSum;
    for (let i = 0; i < index; i++) value *= steps[i].multiplier;
    return value;
  }, [diceSum, index, steps]);

  // decide primary display
  const display =
    phase === "collecting" || phase === "holdPlus"
      ? rolls.join(" + ")
      : score.toFixed(2);

  if (!rolls.length && index === 0) return null;

  return (
    <div className="flex flex-col items-center space-y-4 absolute top-10 left-1/2 -translate-x-1/2 z-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${phase}-${display}`}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-4xl font-bold">
          {display}
        </motion.div>
      </AnimatePresence>

      {(phase === "sumPause" || phase === "stepping") && (
        <div className="flex space-x-2 flex-wrap">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className={`px-3 py-1 rounded-lg text-lg font-semibold w-max ${
                i === index - 1
                  ? step.type === "Ability"
                    ? "bg-blue-400 text-white"
                    : step.type === "Weakness"
                    ? "bg-red-400 text-white"
                    : "bg-blue-600 text-white"
                  : "bg-transparent text-white"
              }`}
              animate={i === index - 1 ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5 }}>
              {step.title}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
