import { ReactElement } from "react";
import { AbilityView } from "./AbilityView";
import { Card } from "../classes/card/Card";
import { WeaknessView } from "./WeaknessView";

type CardViewProps = {
  card: Card;
  stack?: number;
  onClick?: () => void;
};

export function CardView({ card, stack, onClick }: CardViewProps) {
  if (!card?.data) return null;
  let stackDisplay: ReactElement | null = null;

  if (stack) {
    stackDisplay = (
      <div className="absolute top-5 right-5 text-4xl font-bold">{stack}x</div>
    );
  }
  return (
    <div
      className={`w-full h-full p-2 rounded-3xl ${card.data.rarity.borderColor} ${card.data.rarity.textColor}`}
      onClick={onClick}>
      <div
        className={`w-full h-full p-4 rounded-2xl relative ${card.data.rarity.backgroundColor}`}>
        {stackDisplay}
        <h2 className="md:text-3xl font-bold mt-1 text-xl text-center">
          {card.data.title}
        </h2>
        <p className="text-gray-300 mt-1 text-base md:text-xl">
          {card.data.description}
        </p>
        <p className="text-gray-500 text-xs align-text-bottom">Abilities</p>
        <div className="">
          {card.data.abilities.map((a, idx) => (
            <AbilityView
              ability={a}
              key={`${card?.data?.title}_ABILITY_${idx}`}></AbilityView>
          ))}
        </div>
        <p className="text-gray-500 text-xs align-text-bottom">Weaknesses</p>
        <div className="">
          {card.data.weaknesses.map((w, idx) => (
            <WeaknessView
              weakness={w}
              key={`${card?.data?.title}_WEAKNESS_${idx}`}></WeaknessView>
          ))}
        </div>
      </div>
    </div>
  );
}
