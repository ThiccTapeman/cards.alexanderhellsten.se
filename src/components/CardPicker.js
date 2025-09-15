import { useState } from "react";

import cards from "./config/Cards.json";
import rarities from "./config/CardRarities.json";
import { Card, CardView } from "./classes/Card";

export function CardPicker({ setNewCard }) {
  const [choices, setChoices] = useState([]);
  const [selected, setSelected] = useState(null);

  function getRandomCard() {
    const rand = Math.random();
    let cumulative = 0;
    const rarity =
      rarities.cardRarities.find((r) => {
        cumulative += r.chance;
        return rand <= cumulative;
      }) || rarities[0];

    const pool = cards.cards.filter((c) => c.rarity === rarity.title);
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function pickThree() {
    const picked = [];
    for (let i = 0; i < 3; i++) {
      const c = getRandomCard();
      picked.push(new Card(c.title, 1, null));
    }
    setChoices(picked);
    setSelected(null);
  }

  if (choices.length === 0) {
    return (
      <div className="flex justify-center p-4">
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded-lg"
          onClick={pickThree}>
          Draw Cards
        </button>
      </div>
    );
  }

  return (
    <div className="fixed w-screen h-screen bg-black/80 -translate-y-39/100 flex flex-col gap-4 justify-center items-center">
      <div className="grid grid-cols-3 gap-4">
        {choices.map((card, i) => {
          return (
            <CardView
              card={card}
              unlocked={true}
              key={"PICK_CARD_" + i}
              onClick={() => setSelected(card)}></CardView>
          );
        })}
      </div>

      {selected && (
        <div className="p-4 fixed right-0 w-1/2 rounded-xl border bg-gray-900 text-white">
          <h2 className="text-xl font-bold">{selected.title}</h2>
          <p className="mb-2">{selected.description}</p>
          <p>Type: {selected.type}</p>
          <p>Base Multiplier: {selected.multiplier}</p>
          <div className="grid grid-cols-2">
            <div className="">
              <h3 className="font-bold mt-2">Abilities</h3>
              {selected.abilities.map((a, idx) => (
                <div key={idx} className="ml-2 mb-1">
                  <p className="font-semibold">{a.title}</p>
                  <p className="text-sm">{a.description}</p>
                  <p className="text-sm">
                    Multiplier: {a.multiplier} Chance: {a.chance * 100}%
                  </p>
                </div>
              ))}
            </div>
            <div className="">
              <h3 className="font-bold mt-2">Weaknesses</h3>
              {selected.weaknesses.map((w, idx) => (
                <div key={idx} className="ml-2 mb-1">
                  <p className="font-semibold">{w}</p>
                  <p className="text-sm">
                    Multiplier {selected.weaknessMultipliers[idx]}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              className="px-4 py-2 bg-green-600 rounded-lg"
              onClick={() => {
                setNewCard({ title: selected.title, count: 1 });
                setChoices([]);
              }}>
              Choose
            </button>
            <button
              className="px-4 py-2 bg-gray-700 rounded-lg"
              onClick={() => setSelected(null)}>
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
