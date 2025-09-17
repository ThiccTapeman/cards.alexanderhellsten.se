const TypeJSON = require("../../config/Types.json");

export class CardType {
  title: string;

  constructor(title: string) {
    this.title = title;
  }
}

export class CardTypeHandler {
  static types: CardType[] = TypeJSON.types.map(
    (r: any) => new CardType(r.title)
  );

  static Get(title: string): CardType | undefined {
    return this.types.find((r) => r.title === title);
  }
}
