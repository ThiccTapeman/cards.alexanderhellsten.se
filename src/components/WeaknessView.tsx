import { Weakness } from "./classes/card/Weakness";

type WeaknessViewProps = {
  weakness?: Weakness;
};

export function WeaknessView({ weakness }: WeaknessViewProps) {
  if (!weakness) return;
  return (
    <div className="p-1 text-red-500">
      <div className="flex justify-between">
        <h3 className="text-base">{weakness.title}</h3>
        <p className="text-xs ">{weakness.chance * 100}%</p>
      </div>
      <p className="text-red-300">{weakness.description}</p>
    </div>
  );
}
