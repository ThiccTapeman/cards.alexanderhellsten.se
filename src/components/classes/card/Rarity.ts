const RaritiesJSON = require("../../config/Rarities.json");

export class Rarity {
  title: string;
  chance: number;
  borderColor: string;
  textColor: string;
  backgroundColor: string;

  constructor(title: string, data: any) {
    this.title = title;
    this.chance = data.chance;
    this.borderColor = data.border;
    this.textColor = data.foreground;
    this.backgroundColor = data.background;
  }
}

export class RarityHandler {
  static rarities: Rarity[] = RaritiesJSON.rarities.map(
    (r: any) => new Rarity(r.title, r)
  );

  static Get(title: string): Rarity | undefined {
    return this.rarities.find((r) => r.title === title);
  }

  static GetRandom(): Rarity {
    const rand = Math.random();
    let cumulative = 0;

    const rarity =
      this.rarities.find((r) => {
        cumulative += r.chance;
        return rand <= cumulative;
      }) || this.rarities[0];
    return rarity;
  }
}
