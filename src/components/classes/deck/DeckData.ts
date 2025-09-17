import { CardData } from "../card/Card";
import { ChoicesData } from "./Deck";

export type DeckData = {
  choices: ChoicesData;
  cards: CardData[];
};
