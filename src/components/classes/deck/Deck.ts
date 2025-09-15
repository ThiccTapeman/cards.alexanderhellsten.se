import { Card } from "../card/Card";
import { CardIndex } from "../CardIndex";
import { Game, UpdateType } from "../Game";
import { DeckData } from "./DeckData";

export class Deck {
  cards: DeckCard[] = [];
  choices: Card[] = [];

  constructor(data: DeckData | undefined = undefined) {
    // You can initialize deck from data if needed
  }

  /**
   * Adds a new card to the deck, or if it already exists adds onto the stack
   * @param title The card to add
   * @param amount The amount of cards to add
   */
  AddCard(title: string, amount: number) {
    const card = this.cards.find((c) => c.data?.title === title);

    if (card) {
      card.stack += amount;
    } else {
      const card = CardIndex.Get(title);
      if (card instanceof Card) {
        this.cards.push(new DeckCard(card, amount));
      }
    }

    Game.RequestUpdate("deck");
  }

  /**
   * Removes a card from the deck, if the card amount reaches below or at 0 it removes it entirely
   * @param title The card to remove
   * @param amount The amount to remove
   */
  RemoveCard(title: string, amount: number) {
    const card = this.cards.find((c) => c.data?.title === title);

    if (!card) {
      return;
    }

    if (amount >= card.stack) {
      this.cards = this.cards.filter((c) => c.data?.title !== title);
    } else {
      card.stack -= amount;
    }

    Game.RequestUpdate("deck");
  }

  /**
   * Updates the choices
   * @param amount The amount of choices to get
   */
  GetRandomChoices(amount: number) {
    this.choices = [];
    for (let i = 0; i < amount; i++) {
      this.choices.push();
    }

    Game.RequestUpdate("choices");
  }
}

export class DeckCard {
  base: Card;
  stack: number;

  constructor(base: Card, stack: number) {
    this.base = base;
    this.stack = stack;
  }

  get data() {
    return this.base.data;
  }
}
