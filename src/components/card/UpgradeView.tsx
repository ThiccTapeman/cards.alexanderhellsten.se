import { Ability } from "../classes/card/Ability";
import { Upgrade } from "../classes/card/Upgrade";

type UpgradeViewProps = {
  upgrade?: Upgrade;
};

export function UpgradeView({ upgrade }: UpgradeViewProps) {
  if (!upgrade) return;
  return (
    <div className="p-1">
      <div className="flex justify-between">
        <h3 className="text-base">{upgrade.title}</h3>
        <p className="text-xs">{upgrade.type}</p>
      </div>
      <p className="text-gray-300">{upgrade.value}</p>
    </div>
  );
}
