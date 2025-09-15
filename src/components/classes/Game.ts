// Game.ts
import { Deck } from "./deck/Deck";

export class Game {
  deck: Deck;
  static requestUpdateHandler: ((type: string) => void) | null = null;

  constructor() {
    this.deck = new Deck();
    this.deck.AddCard("High Roller", 1);
    this.deck.AddCard("Auto Hands", 1);
  }

  static RequestUpdate(type: string) {
    if (this.requestUpdateHandler) {
      this.requestUpdateHandler(type);
    }
  }
}

export enum UpdateType {
  Deck,
  All,
  Dice,
  Overlay,
}
