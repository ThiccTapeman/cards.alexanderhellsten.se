import { Ability } from "./card/Ability";
import { Card, CardData } from "./card/Card";
import { RarityHandler } from "./card/Rarity";
import { TypeHandler } from "./card/Type";
import { Weakness } from "./card/Weakness";
import { ErrorHandler, ErrorType } from "./ErrorHandler";
const CardJSON = require("../config/Cards.json");

export class CardIndex {
  static cards: Card[] = this.LoadCards();

  private static LoadCards(): Card[] {
    const cards = CardJSON.cards
      .map((c: any) => {
        const data = this.GetCardData(c);
        if (!data) return null;
        return new Card(data);
      })
      .filter((c: Card | null): c is Card => c !== null);
    console.log(cards);
    return cards;
  }
  private static GetCardData(card: any): CardData | null {
    const cardRarity = RarityHandler.Get(card.rarity);
    const cardType = TypeHandler.Get(card.type);

    if (!cardRarity || !cardType) return null;

    const weaknesses = card.weaknesses.map((w: any) => new Weakness(w));
    const abilities = card.abilities.map((a: any) => new Ability(a));

    const data: CardData = {
      title: card.title,
      description: card.description,
      image: card.image,
      rarity: cardRarity,
      type: cardType,
      multiplier: card.multiplier,
      weaknesses: weaknesses,
      abilities: abilities,
    };

    return data;
  }

  static Get(title: string) {
    const card = this.cards.find((c: Card) => c.data?.title == title);
    if (!card) {
      throw new ErrorHandler(
        "Card Index",
        "Card was not found with the title: " + title,
        ErrorType.Value
      );
    }
    return card;
  }

  static GetRandomCard() {
    const rarity = RarityHandler.GetRandom();

    const pool = this.cards.filter((c: Card) => c.data?.rarity === rarity);
    return pool[Math.floor(Math.random() * pool.length)];
  }
}
