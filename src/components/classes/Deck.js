import { Card, CardView } from "./Card";

export function DeckView({ deck }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {deck.cards.map((c) => {
          return <CardView key={c.title} card={c}></CardView>;
        })}
      </div>
    </>
  );
}

export class Deck {
  cards = [];

  constructor(cards = []) {
    this.cards = cards;
  }

  AddCard(card, amount) {
    if (typeof card === "string") {
      this.AddCardByTitle(card, amount);
      return;
    } else if (card instanceof Card) {
      const c = this.cards.find((_c) => _c.title === card.title);
      if (c) {
        c.Add(amount);
        return;
      }
      this.cards.push(card);
    }
  }

  AddCardByTitle(card, amount) {
    const c = new Card(card, amount, this);
    this.AddCard(c, amount);
  }

  RemoveCard(card, amount) {
    let index = -1;
    if (typeof card === "string") {
      index = this.cards.findIndex((c) => c.title === card);
    } else if (card instanceof Card) {
      index = this.cards.findIndex((c) => c.title === card.title);
    }

    if (index == -1) return;

    if (this.cards[index].stack > amount) {
      this.cards[index].Remove(amount);
      return;
    }

    this.cards.splice(index, index + 1);
  }

  GetDeckCastData(type, dice) {
    let cardData = [];
    this.cards.forEach((card) => {
      if (card.type == type) {
        cardData.push(card.GetCastData(dice));
      }
    });
    return new DeckCastData(cardData);
  }

  ContainsCard(card) {
    const r = this.cards.find((c) => c.title === card);
    if (r) return true;
    return false;
  }

  ContainsType(type) {
    const r = this.cards.find((c) => c.type === type);
    if (r) return true;
    return false;
  }

  ToJSON() {
    return {
      cards: this.cards.map((c) => ({
        title: c.title,
        stack: c.stack,
      })),
    };
  }

  static FromJSON(data) {
    const d = new Deck();
    data.cards.forEach((c) => d.AddCardByTitle(c.title, c.stack));
    return d;
  }
}

export class DeckCastData {
  cards;

  constructor(cards) {
    this.cards = cards;
  }

  Calculate(multiply = false) {
    let sum = 0;
    this.cards.forEach((card) => {
      sum += card.Calculate(multiply);
    });
    return sum;
  }

  WithdrawSteps() {
    const steps = [];
    this.cards.forEach((card) => {
      steps.push({
        title: `${card.title} x${card.baseMultiplier}`,
        type: "Card",
        multiplier: card.baseMultiplier,
      });
      card.abilities.forEach((ability, i) =>
        steps.push({
          title: `${ability.title} x${ability.multiplier}`,
          type: "Ability",
          multiplier: ability.multiplier,
        })
      );
      card.weaknesses.forEach((weakness, i) =>
        steps.push({
          title: `${weakness.title} x${weakness.multiplier}`,
          type: "Weakness",
          multiplier: weakness.multiplier,
        })
      );
    });
    return steps;
  }
}
