import { ErrorHandler, ErrorType } from "../ErrorHandler";
import { Ability } from "./Ability";
import { Weakness } from "./Weakness";

import { Rarity, RarityHandler } from "./Rarity";
import { Type, TypeHandler } from "./Type";

const CardJSON = require("../../config/Cards.json");

export type CardData = {
  title: string;
  description: string;
  image: string;
  rarity: Rarity;
  type: Type;
  multiplier: number;
  weaknesses: [Weakness];
  abilities: [Ability];
};

export class Card {
  data: CardData | undefined = undefined;

  /**
   * Creates and loads a card with the title.
   * @param title The card that will be loaded onto the class.
   * @param stack The starting stack that will be applied to the card.
   */
  constructor(data: CardData) {
    this.data = data;
  }

  /**
   * Loads the card into Card.data
   * @param title The title to load the card with
   */
  Init(title: string) {}
}
