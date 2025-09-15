import { Ability } from "./classes/card/Ability";

type AbilityViewProps = {
  ability?: Ability;
};

export function AbilityView({ ability }: AbilityViewProps) {
  if (!ability) return;
  return (
    <div className="p-1">
      <div className="flex justify-between">
        <h3 className="text-base">{ability.title}</h3>
        <p className="text-xs">{ability.chance * 100}%</p>
      </div>
      <p className="text-gray-300">{ability.description}</p>
    </div>
  );
}
