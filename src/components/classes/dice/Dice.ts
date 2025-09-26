import { Action } from "../Action";
export class Dice {
  private rolls: number[] = [];
  private total: number = 0;
  private canRoll: boolean = true;

  onRollCompleted: Action = new Action();
  onRollStarted: Action = new Action();

  /* Singelton instance */
  static instance: Dice = new Dice();

  CanRoll() {
    return this.canRoll;
  }

  SetCanRoll(n: boolean) {
    this.canRoll = n;
  }

  /**
   * Sets the rolls so it can be accessed from everywhere
   * @param rolls the rolls as number[]
   * @param total the total value of the rolls
   */
  Set(rolls: number[], total: number) {
    this.rolls = rolls;
    this.total = total;
  }

  /**
   * Search the previous dice roll for a number
   * @param n The number to search for
   * @returns true if the number exists, false if not.
   */
  Contains(n: number) {
    const r = this.rolls.find((r) => r == n);
    if (r) return true;
    return false;
  }
}
