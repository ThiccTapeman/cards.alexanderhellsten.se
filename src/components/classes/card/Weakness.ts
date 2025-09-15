import { ErrorHandler, ErrorType } from "../ErrorHandler";

export class Weakness {
  title: string = "";
  description: string = "";
  multiplier: number = 0;
  chance: number = 0;
  constructor(data: any) {
    if (
      typeof data.title != "string" ||
      typeof data.description != "string" ||
      typeof data.multiplier != "number" ||
      typeof data.chance != "number"
    ) {
      throw new ErrorHandler(
        "Weakness",
        "Weakness in data was wrong.",
        ErrorType.Value
      );
      return;
    }
    this.title = data.title;
    this.description = data.description;
    this.multiplier = data.multiplier;
    this.chance = data.chance;
  }
}
