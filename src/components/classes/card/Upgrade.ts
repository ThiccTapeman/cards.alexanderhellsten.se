import { ErrorHandler, ErrorType } from "../ErrorHandler";

export enum UpgradeType {
  Value = "Value",
  Chance = "Chance",
  Multiplier = "Multiplier",
  WeaknessMitigation = "Weakness Mitigation",
}

export class Upgrade {
  id: string = "";
  title: string = "";
  type: UpgradeType | null = null;
  modifier: string | null = null;
  value: number = 0;

  constructor(data: any) {
    if (
      typeof data.id !== "string" ||
      typeof data.title !== "string" ||
      !(Object.values(UpgradeType) as string[]).includes(data.type) ||
      typeof data.value !== "number" ||
      (data.modifier !== undefined &&
        data.modifier !== null &&
        typeof data.modifier !== "string")
    ) {
      throw new ErrorHandler(
        "Upgrade",
        "Upgrade data was invalid: " + JSON.stringify(data),
        ErrorType.Value
      );
    }

    this.id = data.id;
    this.title = data.title;
    this.type = data.type as UpgradeType;
    this.modifier = data.modifier ?? null;
    this.value = data.value;
  }
}
