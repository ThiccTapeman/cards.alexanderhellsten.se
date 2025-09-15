// Dice.js
import DiceBox from "@3d-dice/dice-box";
import { scale } from "framer-motion";

export class Dice {
  constructor() {
    this.diceBox = null;
    this.lastRoll = [];
    this.lastResult = null;
    this.ready = false;
  }

  async init(containerId) {
    this.diceBox = new DiceBox("#" + containerId, {
      assetPath: "/assets/",
      scale: 6,
      offscreen: false,
      theme: "smooth-pip",
      themeColor: "#ffffff",
    });

    await this.diceBox.init();
    this.ready = true;
  }

  async Roll(amount) {
    if (!this.ready) return null;
    const notation = { qty: amount, sides: "pip" };
    const result = await this.diceBox.roll(notation, {});
    console.log(result);
    return new DiceResult(result);
  }

  GetLastRoll() {
    return this.lastRoll;
  }
}

export class DiceResult {
  result = {};
  constructor(result) {
    this.result = result;
  }

  Stringify() {
    return JSON.stringify(this.result);
  }

  Contains(number) {
    const r = this.result.find((_r) => _r.value == number);
    if (r) return true;
    return false;
  }

  Value() {
    return this.result.reduce((a, b) => a + b.value, 0);
  }
}
