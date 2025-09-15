import { CurrencyData } from "./CurrencyData";

export class Currency {
  amount: number = 0;
  title: string = "";

  constructor(data: CurrencyData) {
    this.amount = data.amount;
    this.title = data.title;
  }

  CanAfford(price: number) {
    return this.amount >= price;
  }

  ToString(): string {
    return Currency.ToString(this);
  }

  static ToString(currency: Currency): string {
    const num = currency.amount;
    if (num < 1000) return num.toString();

    const suffixes = ["", "k", "m", "b", "t", "q", "Q", "s", "S"];
    const tier = Math.floor(Math.log10(num) / 3);

    if (tier >= suffixes.length) return num.toExponential(2);

    const suffix = suffixes[tier];
    const scale = Math.pow(10, tier * 3);
    const scaled = num / scale;

    return scaled.toFixed(1).replace(/\.0$/, "") + suffix;
  }
}
