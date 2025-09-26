import { Currency } from "./Currency";

export default class CurrencyHandler {
  currencies: Currency[] = [];

  static instance: CurrencyHandler = new CurrencyHandler();

  Add(currency: Currency) {
    this.currencies.push(currency);
  }

  GetCurrency(title: string) {
    const c = this.currencies.find((c) => c.title == title);
    if (c) return c;
    return null;
  }
}
