import { ErrorHandler, ErrorType } from "../ErrorHandler";
import { Ability } from "./Ability";
import { Weakness } from "./Weakness";

import { Rarity, RarityHandler } from "./Rarity";
import { CardType, CardTypeHandler } from "./Type";
import { Upgrade } from "./Upgrade";

export type CardData = {
  title: string;
  description: string;
  image: string;
  rarity: Rarity;
  type: CardType;
  multiplier: number;
  upgrades: [Upgrade, Upgrade];
  weaknesses: [Weakness];
  abilities: [Ability];
};

export class Card {
  data: CardData | undefined = undefined;

  /**
   * Creates and loads a card with the title.
   * @param title The card that will be loaded onto the class.
   */
  constructor(data: CardData) {
    this.data = data;
  }
}
