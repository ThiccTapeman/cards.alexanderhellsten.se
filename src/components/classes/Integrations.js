// Integrations.js

import { Card } from "./Card";

// Deck
function deckToPlain() {
  return {
    cards: this.cards.map((c) => ({ title: c.title, stack: c.stack })),
  };
}
function deckApplyPlain(data) {
  this.cards.length = 0;
  for (const pc of data.cards) {
    const card = new Card(pc.title, pc.stack, this);
    this.cards.push(card);
  }
}

// Currency
function currencyToPlain() {
  return {
    title: this.title,
    value: this.value,
    totalEarned: this.totalEarned,
  };
}
function currencyApplyPlain(data) {
  this.title = data.title;
  this.value = data.value;
  this.totalEarned = data.totalEarned;
}

// Dice
function diceToPlain() {
  return {
    lastRoll: Array.isArray(this.lastRoll) ? this.lastRoll.slice() : undefined,
    faces: this.faces,
  };
}
function diceApplyPlain(data) {
  if (Array.isArray(data.lastRoll)) this.lastRoll = data.lastRoll.slice();
  if (typeof data.faces === "number") this.faces = data.faces;
}

// GameManager
function gmGetGameState() {
  return {
    _v: 1,
    timestamp: Date.now(),
    deck: this.deck.toPlain(),
    dice: this.dice.toPlain(),
    cash: this.cash.toPlain(),
  };
}
function gmApplyState(state) {
  if (state._v !== 1) throw new Error("Unsupported version");
  this.deck.applyPlain(state.deck);
  this.dice.applyPlain(state.dice || {});
  this.cash.applyPlain(state.cash);
}

export function patchPrototypes({ Deck, Currency, Dice, GameManager }) {
  Deck.prototype.toPlain = deckToPlain;
  Deck.prototype.applyPlain = deckApplyPlain;

  Currency.prototype.toPlain = currencyToPlain;
  Currency.prototype.applyPlain = currencyApplyPlain;

  Dice.prototype.toPlain = diceToPlain;
  Dice.prototype.applyPlain = diceApplyPlain;

  GameManager.prototype.GetGameState = gmGetGameState;
  GameManager.prototype.ApplyState = gmApplyState;
}
