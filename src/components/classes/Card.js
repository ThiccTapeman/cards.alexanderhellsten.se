import Cards from "../config/Cards.json";
import Rarities from "../config/CardRarities.json";
import { Lock } from "lucide-react";

export function CardView({ card, unlocked = false, onClick }) {
  return (
    <>
      <div
        className={`rounded-3xl ${card.borderColor} p-2 ${card.foregroundColor} relative`}
        onClick={onClick}>
        <div className="absolute top-5 right-7 font-bold text-2xl">
          <p>{card.stack}x</p>
        </div>
        <div className={`rounded-2xl ${card.backgroundColor} p-5 h-full`}>
          <h2 className="text-3xl font-bold">{card.title}</h2>
          <p className="">{card.description}</p>
          <p className="text-gray-400 text-xs">Abilities</p>
          <div className="flex flex-col gap-2">
            {card.abilities.map((a) => {
              return (
                <AbilityView
                  ability={a}
                  key={a.title}
                  unlocked={unlocked}></AbilityView>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export function AbilityView({ ability, unlocked = false }) {
  return (
    <>
      <div className="relative w-full h-full">
        {ability.IsLocked() && !unlocked && (
          <div className="absolute w-full h-full rounded-xl bg-black/60 flex justify-center items-center">
            <Lock></Lock>
          </div>
        )}
        <div className="p-3">
          <div className="flex justify-between">
            <h3>{ability.title}</h3>
            <p className="text-xs">{ability.chance * 100}%</p>
          </div>
          <p className="text-gray-300">{ability.description}</p>
        </div>
      </div>
    </>
  );
}

export class Card {
  deck;

  stack;

  title = "";
  description = "";
  image = "";
  rarity = "";
  type = "";
  multiplier = 0;
  weaknesses = [];
  weaknessMultipliers = [];
  abilities = [];

  foregroundColor = "";
  backgroundColor = "";
  borderColor = "";
  constructor(title, stack, deck) {
    this.title = title;
    this.stack = stack;
    this.deck = deck;

    this.Load();
  }

  Add(stack) {
    this.stack += stack;
  }

  Remove(stack) {
    this.stack -= stack;
  }

  Load() {
    const card = Cards.cards.find((c) => c.title == this.title);

    if (!card)
      throw new Error("Card could not be found with title: " + this.title);

    this.description = card.description;
    this.image = card.image;
    this.rarity = card.rarity;
    this.type = card.type;
    this.multiplier = card.multiplier;
    this.weaknesses = card.weaknesses;
    this.weaknessMultipliers = card.weaknessMultiplier;

    this.abilities = card.abilities.map((a) => {
      return new CardAbility(
        a.title,
        a.description,
        a.requirement,
        a.diceRequirement,
        a.multiplier,
        a.chance,
        this
      );
    });

    const rarity = Rarities.cardRarities.find((r) => r.title === this.rarity);

    if (!rarity)
      throw new Error("Rarity could not be found with title: " + this.rarity);

    this.borderColor = rarity.border;
    this.foregroundColor = rarity.foreground;
    this.backgroundColor = rarity.background;
  }

  GetCastData(dice) {
    let abilitiesData = [];
    let weaknesses = this.GetWeaknessesData();

    this.abilities.forEach((ability) => {
      const abM = ability.GetAbilityMultiplier(dice);
      if (abM != -1) {
        abilitiesData.push(new AbilityCastData(ability.title, abM));
      }
    });

    let baseMultiplier = this.stack * this.multiplier;

    return new CardCastData(
      this.title,
      abilitiesData,
      baseMultiplier,
      weaknesses
    );
  }

  GetWeaknessesData() {
    let weaknessData = [];
    this.weaknesses.forEach((weakness, i) => {
      if (
        this.deck.ContainsType(weakness) ||
        this.deck.ContainsCard(weakness)
      ) {
        let wm = this.weaknessMultipliers[i];
        for (let i = 0; i < this.stack; i++) {
          wm *= this.weaknessMultipliers[i];
        }
        weaknessData.push(new WeaknessData(weakness, wm));
      }
    });
    return weaknessData;
  }
}

export class CardAbility {
  constructor(
    title,
    description,
    requirement,
    diceRequirement,
    multiplier,
    chance,
    card
  ) {
    this.title = title;
    this.description = description;
    this.requirement = requirement;
    this.diceRequirement = diceRequirement;
    this.multiplier = multiplier;
    this.chance = chance;
    this.card = card;
  }

  GetAbilityMultiplier(dice) {
    if (this.IsLocked()) return -1;

    const r = Math.random();
    if (r < this.chance) {
      if (this.diceRequirement != 0) {
        if (dice.Contains(this.diceRequirement)) return this.multiplier;
        return -1;
      }
      return this.multiplier;
    }
    return -1;
  }

  IsLocked() {
    if (this.card.stack < this.requirement) return true;
    return false;
  }
}

export class CardCastData {
  title;
  abilities;
  baseMultiplier;
  weaknesses;

  constructor(title, abilities, baseMultiplier, weaknesses) {
    this.title = title;
    this.abilities = abilities;
    this.baseMultiplier = baseMultiplier;
    this.weaknesses = weaknesses;
  }

  Calculate(multiply = true) {
    let m = this.baseMultiplier;
    this.abilities.forEach((ability) => {
      m = multiply ? m * ability.multiplier : m + ability.multiplier;
    });

    this.weaknesses.forEach((weakness) => {
      m *= weakness.multiplier;
    });

    return m;
  }
}

export class WeaknessData {
  title;
  multiplier;

  constructor(title, multiplier) {
    this.title = title;
    this.multiplier = multiplier;
  }
}

export class AbilityCastData {
  title;
  multiplier;

  constructor(title, multiplier) {
    this.title = title;
    this.multiplier = multiplier;
  }
}
