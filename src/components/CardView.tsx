import { AbilityView } from "./AbilityView";
import { Card } from "./classes/card/Card";

type CardViewProps = {
  card?: Card;
};

export function CardView({ card }: CardViewProps) {
  if (!card) return null;
  if (!card?.data) return null;
  return (
    <div
      className={`w-full h-full p-2 rounded-3xl ${card.data.rarity.borderColor} ${card.data.rarity.textColor}`}>
      <div
        className={`w-full h-full p-4 rounded-2xl ${card.data.rarity.backgroundColor}`}>
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
      </div>
    </div>
  );
}
