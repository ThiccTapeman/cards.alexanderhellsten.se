import { ErrorHandler, ErrorType } from "../ErrorHandler";

export enum WeaknessType {
  Dice = "Dice",
  Card = "Card",
  Category = "Category",
}

export class Weakness {
  id: string = "";
  title: string = "";
  description: string = "";
  type: WeaknessType | null = null;
  requirement: string | number | null = null;
  multiplier: number = 0;
  chance: number = 0;

  constructor(data: any) {
    if (
      typeof data.id !== "string" ||
      typeof data.title !== "string" ||
      typeof data.description !== "string" ||
      !(Object.values(WeaknessType) as string[]).includes(data.type) ||
      (typeof data.requirement !== "string" &&
        typeof data.requirement !== "number") ||
      typeof data.multiplier !== "number" ||
      typeof data.chance !== "number"
    ) {
      throw new ErrorHandler(
        "Weakness",
        "Weakness in data was wrong: " + JSON.stringify(data),
        ErrorType.Value
      );
    }

    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.type = data.type as WeaknessType;
    this.requirement = data.requirement;
    this.multiplier = data.multiplier;
    this.chance = data.chance;
  }
}
