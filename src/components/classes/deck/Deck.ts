import { Ability, AbilityType } from "../card/Ability";
import { Card, CardData } from "../card/Card";
import { CardType, CardTypeHandler } from "../card/Type";
import { Weakness, WeaknessType } from "../card/Weakness";
import { CardIndex } from "../CardIndex";
import { Dice } from "../dice/Dice";
import { Action } from "../Action";
import { ErrorHandler, ErrorType } from "../ErrorHandler";
import { Game, UpdateType } from "../Game";
import { DeckData } from "./DeckData";

export class Deck {
  cards: DeckCard[] = [];
  choices: Card[] = [];
  timesChosen: number = 0;

  onDeckLoaded: Action = new Action();
  onCardAdded: Action = new Action();
  onCardRemoved: Action = new Action();

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
        this.cards.push(new DeckCard(card, amount, this));
      }
    }

    this.onCardAdded.Call();
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

    this.onCardRemoved.Call();
    Game.RequestUpdate("deck");
  }

  /**
   * Updates the choices
   * @param amount The amount of choices to get
   */
  GetRandomChoices(amount: number) {
    this.choices = [];
    for (let i = 0; i < amount; i++) {
      this.choices.push(CardIndex.GetRandomCard());
    }

    this.timesChosen += 1;

    Game.RequestUpdate("choices");
  }

  /**
   * Returns true if a card with the title exists in the deck
   */
  Contains(title: string) {
    const c = this.cards.find((c) => c.data?.title == title);
    if (c) return true;
    return false;
  }

  /**
   * Returns true if a card with the type exists in the deck
   */
  ContainsType(type?: CardType) {
    const c = this.cards.find((c) => c.data?.type == type);
    if (c) return true;
    return false;
  }

  /**
   * Will evaluate all cards in the deck
   * @returns Sum of the cards, and the trace [numer, DeckCallTrace]
   */
  CalculateDeck(): [number, DeckCallTrace | null] {
    let trace = new DeckCallTrace();
    let sum: number = 0;

    let weaknessesProcced = 0;
    let abilitiesProcced = 0;
    this.cards.forEach((c) => {
      const [s, t] = c.CalculateCardMultiplier();
      if (t) {
        sum += s;
        trace.cardsProcced.cards?.push(t);
        if (t.abilities) abilitiesProcced += t?.abilities?.length;
        if (t.weaknesses) weaknessesProcced += t?.weaknesses?.length;
      }
    });
    return [sum, trace];
  }
}

export class DeckCard {
  base: Card;
  stack: number;
  deck: Deck;

  constructor(base: Card, stack: number, deck: Deck) {
    this.base = base;
    this.stack = stack;
    this.deck = deck;
  }

  get data() {
    return this.base.data;
  }

  /**
   * Calculates and gets all the traces from that card.
   * @returns [number, CardCallTrace]
   */
  CalculateCardMultiplier(): [number, CardCallTrace | null] {
    const abilities: AbilityCallTrace[] = [];

    let abilityProduct = 1;
    if (this.data?.abilities) {
      for (const ability of this.data.abilities) {
        const [mult, trace] = this.GetAbilityMultiplier(ability);
        abilityProduct *= mult;
        if (trace) abilities.push(trace);
      }
    }

    const weaknesses: WeaknessCallTrace[] = [];
    let weaknessProduct = 1;
    if (this.data?.weaknesses) {
      for (const weakness of this.data.weaknesses) {
        const [mult, trace] = this.GetWeaknessMultiplier(weakness);
        weaknessProduct *= mult;
        if (trace) weaknesses.push(trace);
      }
    }

    let mult = this.data?.multiplier;
    if (!mult) mult = 1;

    const total = mult * abilityProduct * weaknessProduct;

    return [
      total,
      new CardCallTrace(
        this.data?.title ?? "",
        this.data?.type ?? null,
        mult,
        total,
        abilities,
        weaknesses
      ),
    ];
  }

  private GetAbilityMultiplier(
    ability: Ability
  ): [number, AbilityCallTrace | null] {
    if (ability.IsLocked(this.stack)) return [1, null];

    const random = Math.random();

    if (random > ability.chance) return [1, null];

    let sum = ability.multiplier;
    switch (ability.requirementType) {
      case AbilityType.Card:
        if (typeof ability.abilityRequirement !== "string") {
          throw new ErrorHandler(
            "Deck Card",
            "Value missmatch",
            ErrorType.Value
          );
        }
        if (!this.deck.Contains(ability.abilityRequirement)) sum = 0;
        break;
      case AbilityType.Dice:
        if (typeof ability.abilityRequirement !== "number") {
          throw new ErrorHandler(
            "Deck Card",
            "Value missmatch",
            ErrorType.Value
          );
        }

        if (!Dice.GetDice().Contains(ability.requirement)) sum = 0;
        break;
      case AbilityType.Category:
        if (typeof ability.abilityRequirement !== "string") {
          throw new ErrorHandler(
            "Deck Card",
            "Value missmatch",
            ErrorType.Value
          );
        }
        if (
          !this.deck.ContainsType(
            CardTypeHandler.Get(ability.abilityRequirement)
          )
        )
          sum = 0;
        break;
    }

    return [sum, new AbilityCallTrace(ability.title, sum)];
  }

  private GetWeaknessMultiplier(
    weakness: Weakness
  ): [number, WeaknessCallTrace | null] {
    const random = Math.random();
    if (random > weakness.chance) return [1, null];

    let sum = weakness.multiplier;
    switch (weakness.type) {
      case WeaknessType.Card:
        if (typeof weakness.requirement !== "string") {
          throw new ErrorHandler(
            "Deck Card",
            "Value missmatch",
            ErrorType.Value
          );
        }
        if (!this.deck.Contains(weakness.requirement)) sum = 0;
        break;
      case WeaknessType.Category:
        if (typeof weakness.requirement !== "string") {
          throw new ErrorHandler(
            "Deck Card",
            "Value missmatch",
            ErrorType.Value
          );
        }
        if (!this.deck.ContainsType(CardTypeHandler.Get(weakness.requirement)))
          sum = 0;
        break;
      case WeaknessType.Dice:
        if (typeof weakness.requirement !== "number") {
          throw new ErrorHandler(
            "Deck Card",
            "Value missmatch",
            ErrorType.Value
          );
        }
        if (!Dice.GetDice().Contains(weakness.requirement)) sum = 0;
        break;
    }

    return [sum, new WeaknessCallTrace(weakness.title, sum)];
  }
}

export type ChoicesData = {
  card: CardData[];
  times: number;
};

export class DeckCallTrace {
  cardsProcced: CardCallList = new CardCallList();
  abilitiesProcced: number = 0;
  weaknessesProcced: number = 0;

  /**
   * Gets all the cards with that type from the deck call
   * @param types What types of cards to gether
   * @returns A CardCallList with all the cards
   */
  GetOfType(type: string): CardCallList {
    const list = new CardCallList();
    this.cardsProcced.cards?.forEach((c) => {
      if (c.type?.title == type) list.cards.push(c);
    });

    return list;
  }

  /**
   * Gets all the cards with those types from the deck call
   * @param types Array of types to gather
   * @returns A CardCallList with all the cards
   */
  GetOfTypes(types: string[]): CardCallList {
    const list = new CardCallList();
    types.forEach((type) => {
      list.cards.concat(this.GetOfType(type).cards);
    });
    return list;
  }
}

export class CardCallList {
  cards: CardCallTrace[] = [];

  Evaluate(): number {
    let sum = 0;
    this.cards.forEach((c) => {
      sum += c.total;
    });

    return sum;
  }
}

export class CardCallTrace {
  title: string = "";
  type: CardType | null = null;
  multiplier: number = 0;
  total: number = 0;
  abilities: AbilityCallTrace[] | null = null;
  weaknesses: WeaknessCallTrace[] | null = null;

  constructor(
    title: string,
    type: CardType | null,
    multiplier: number,
    total: number,
    abilities: AbilityCallTrace[] | null,
    weaknesses: WeaknessCallTrace[] | null
  ) {
    this.title = title;
    this.type = type;
    this.multiplier = multiplier;
    this.total = total;
    this.abilities = abilities;
    this.weaknesses = weaknesses;
  }
}

export class AbilityCallTrace {
  title: string = "";
  multiplier: number = 0;
  constructor(title: string, multiplier: number) {
    this.title = title;
    this.multiplier = multiplier;
  }
}

export class WeaknessCallTrace {
  title: string = "";
  multiplier: number = 0;

  constructor(title: string, multiplier: number) {
    this.title = title;
    this.multiplier = multiplier;
  }
}
