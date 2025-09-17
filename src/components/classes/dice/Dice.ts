export class Dice {
  rolls: any[] = [];
  total: number = 0;
  static dice: Dice = new Dice();
  static GetDice() {
    return this.dice;
  }

  Set(rolls: any[], total: number) {
    this.rolls = rolls;
    this.total = total;
  }

  Contains(n: number) {
    const r = this.rolls.find((r) => r == n);
    if (r) return true;
    return false;
  }
}
