import { Card } from "./classes/card/Card";

type CardViewProps = {
  card?: Card;
};

export function CardView({ card }: CardViewProps) {
  if (!card) return null;
  if (!card?.data) return null;
  return (
    <div
      className={`w-full h-full p-3 rounded-3xl ${card.data.rarity.borderColor} ${card.data.rarity.textColor}`}>
      <div
        className={`w-full h-full p-3 rounded-xl ${card.data.rarity.backgroundColor}`}>
        <h2>{card.data.title}</h2>
        <p>{card.data.description}</p>
      </div>
    </div>
  );
}
