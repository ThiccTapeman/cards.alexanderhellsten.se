export class Currency {
  value = 0;
  totalEarned = 0;
  title;
  constructor(title, amount) {
    this.value = amount;
    this.title = title;
  }

  Add(amount) {
    this.value += amount;
    this.totalEarned += amount;
  }

  Sub(amount) {
    this.value -= amount;
  }

  CanAfford(amount) {
    return this.value >= amount;
  }

  ToJSON() {
    return {
      title: this.title,
      value: this.value,
      totalEarned: this.totalEarned,
    };
  }

  static FromJSON(data) {
    const c = new Currency(data.title, data.value);
    c.totalEarned = data.totalEarned;
    return c;
  }

  ToString() {
    return Currency.Stringify(this.value);
  }

  static Stringify(value) {
    const suffixes = [
      "",
      "k",
      "m",
      "b",
      "t",
      "qa",
      "qi",
      "sx",
      "sp",
      "oc",
      "no", // 10^15–10^21
      "dc",
      "udc",
      "ddc",
      "tdc",
      "qdc",
      "qndc",
      "sxd",
      "spd",
      "odc",
      "ndc", // 10^33
    ];

    let num = value;
    let tier = 0;
    while (num >= 1000 && tier < suffixes.length - 1) {
      num /= 1000;
      tier++;
    }

    // Show 2 decimals if < 10, 1 decimal if < 100, else none
    let formatted;
    if (num < 10) {
      formatted = num.toFixed(2);
    } else if (num < 100) {
      formatted = num.toFixed(1);
    } else {
      formatted = Math.floor(num).toString();
    }

    return formatted + suffixes[tier];
  }
}
