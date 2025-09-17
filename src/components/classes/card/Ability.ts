import { ErrorHandler, ErrorType } from "../ErrorHandler";
import { Card } from "./Card";

export enum AbilityType {
  Null = "Null",
  Dice = "Dice",
  Card = "Card",
  Category = "Category",
}

export class Ability {
  title: string = "";
  description: string = "";
  requirement: number = 0;
  requirementType: AbilityType | null = null;
  abilityRequirement: number | string | null = null;
  multiplier: number = 0;
  chance: number = 0;
  constructor(data: any) {
    if (
      typeof data.title != "string" ||
      typeof data.description != "string" ||
      typeof data.requirement != "number" ||
      typeof data.requirementType != "string" ||
      (typeof data.abilityRequirement != "number" &&
        typeof data.abilityRequirement != "string") ||
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
    this.requirementType = data.requirementType;
    this.abilityRequirement = data.abilityRequirement;
    this.multiplier = data.multiplier;
    this.chance = data.chance;
  }

  IsLocked(stack: number) {
    if (this.requirement > stack) return true;
    return false;
  }
}
