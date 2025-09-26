import { ErrorHandler, ErrorType } from "../ErrorHandler";

export enum AbilityType {
  Null = "Null",
  Dice = "Dice",
  Card = "Card",
  Category = "Category",
}

export class Ability {
  id: string = "";
  title: string = "";
  description: string = "";
  stackRequirement: number = 0;
  requirement: number | string = 0;
  requirementType: AbilityType | null = null;
  abilityRequirement: number | string | null = null;
  multiplier: number = 0;
  chance: number = 0;
  type: string = "";

  constructor(data: any) {
    if (
      typeof data.id !== "string" ||
      typeof data.title !== "string" ||
      typeof data.description !== "string" ||
      typeof data.stackRequirement !== "number" ||
      !(Object.values(AbilityType) as string[]).includes(
        data.requirementType
      ) ||
      (typeof data.requirement !== "number" &&
        typeof data.requirement !== "string") ||
      typeof data.type !== "string" ||
      typeof data.multiplier !== "number" ||
      typeof data.chance !== "number"
    ) {
      throw new ErrorHandler(
        "Ability",
        "Ability data was invalid: " + JSON.stringify(data),
        ErrorType.Value
      );
    }

    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.stackRequirement = data.stackRequirement;
    this.requirement = data.requirement;
    this.requirementType = data.requirementType as AbilityType;
    this.abilityRequirement = data.abilityRequirement ?? null;
    this.multiplier = data.multiplier;
    this.chance = data.chance;
    this.type = data.type;
  }

  IsLocked(stack: number) {
    return this.stackRequirement > stack;
  }
}
