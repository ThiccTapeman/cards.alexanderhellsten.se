import { Ability } from "./card/Ability";
import { Card, CardData } from "./card/Card";
import { RarityHandler } from "./card/Rarity";
import { CardTypeHandler } from "./card/Type";
import { Weakness } from "./card/Weakness";
import { ErrorHandler, ErrorType } from "./ErrorHandler";
const CardJSON = require("../config/Cards.json");

export class CardIndex {
  static cards: Card[] = this.LoadCards();

  /**
   * Loads all the cards from /src/components/config/Cards.json
   * @returns A list of cards that are loaded from the cards.json file
   */
  private static LoadCards(): Card[] {
    const cards = CardJSON.cards
      .map((c: any) => {
        const data = this.GetCardData(c);
        if (!data) return null;
        return new Card(data);
      })
      .filter((c: Card | null): c is Card => c !== null);

    if (cards.length == 0) {
      throw new ErrorHandler(
        "CardIndex",
        "Couldn't load cards from the json.",
        ErrorType.Null
      );
    }

    return cards;
  }

  /**
   * Private getter to get a CardData type from a base card json
   * @param card Card json
   * @returns A CardData type with the data from the json
   */
  private static GetCardData(card: any): CardData | null {
    const cardRarity = RarityHandler.Get(card.rarity);
    const cardType = CardTypeHandler.Get(card.type);

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

  /**
   * Tries to get a card with the title
   * @param title The title of the card to try to get
   * @returns The card with the title
   */
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

  /**
   * Gets a random card from the index, chances are based on the chances of the rarities.
   * @returns One card
   */
  static GetRandomCard() {
    const rarity = RarityHandler.GetRandom();

    const pool = this.cards.filter((c: Card) => c.data?.rarity === rarity);
    return pool[Math.floor(Math.random() * pool.length)];
  }
}
