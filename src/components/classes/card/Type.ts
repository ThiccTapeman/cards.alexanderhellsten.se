const TypeJSON = require("../../config/Types.json");

export class Type {
  title: string;

  constructor(title: string) {
    this.title = title;
  }
}

export class TypeHandler {
  static types: Type[] = TypeJSON.types.map((r: any) => new Type(r.title));

  static Get(title: string): Type | undefined {
    return this.types.find((r) => r.title === title);
  }
}
