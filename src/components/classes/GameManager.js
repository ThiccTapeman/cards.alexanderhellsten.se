import { Currency } from "./Currency";
import { Deck } from "./Deck";
import { Dice } from "./Dice";

// GameManager.js
export class GameManager {
  deck;
  dice;
  cash;
  constructor() {
    this.deck = new Deck();
    this.dice = new Dice();
    this.cash = new Currency("Cash", 0);
  }

  AddCardToDeck(card, amount) {
    this.deck.AddCard(card, amount);
    this.SaveGame();
  }

  RemoveCardFromDeck(card, amount) {
    this.deck.RemoveCard(card, amount);
    this.SaveGame();
  }

  GetGameState() {
    return {
      deck: this.deck.ToJSON(),
      cash: this.cash.ToJSON(),
    };
  }

  SaveGame() {
    if (typeof window === "undefined") return;
    const state = this.GetGameState();
    window.localStorage.setItem("gameState", JSON.stringify(state));
  }

  static LoadGame() {
    if (typeof window === "undefined") return new GameManager();
    const data = window.localStorage.getItem("gameState");
    if (!data) return new GameManager();
    const state = JSON.parse(data);
    const gm = new GameManager();
    gm.deck = Deck.FromJSON(state.deck);
    gm.cash = Currency.FromJSON(state.cash);
    return gm;
  }
}
