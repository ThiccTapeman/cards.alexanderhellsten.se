import { ErrorHandler, ErrorType } from "../ErrorHandler";
import { Card } from "./Card";

export class Ability {
  title: string = "";
  description: string = "";
  requirement: number = 0;
  diceRequirement: number = 0;
  multiplier: number = 0;
  chance: number = 0;
  constructor(data: any) {
    if (
      typeof data.title != "string" ||
      typeof data.description != "string" ||
      typeof data.requirement != "number" ||
      typeof data.diceRequirement != "number" ||
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
    this.requirement = data.requirement;
    this.diceRequirement = data.diceRequirement;
    this.multiplier = data.multiplier;
    this.chance = data.chance;
  }
}
