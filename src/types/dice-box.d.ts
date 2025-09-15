declare module "@3d-dice/dice-box" {
  export interface DiceBoxOptions {
    assetPath?: string;
    theme?: string;
    scale?: number;
    gravity?: number;
    mass?: number;
    restitution?: number;
    friction?: number;
    linearDamping?: number;
    angularDamping?: number;
    settleTimeout?: number;
    startingHeight?: number;
  }

  export interface RollResult {
    rolls: { sides: number | string; value: number }[];
    total: number;
  }

  export default class DiceBox {
    constructor(selector: string, options?: DiceBoxOptions);

    init(): Promise<void>;

    roll(
      notation: string,
      options?: { theme?: string; label?: string }
    ): Promise<RollResult[]>;

    clear(): void;

    updateConfig(options: Partial<DiceBoxOptions>): void;

    destroy(): void;

    onDieComplete?: (die: { sides: number | string; value: number }) => void;
    onRollComplete?: (results: RollResult[]) => void;
  }
}
