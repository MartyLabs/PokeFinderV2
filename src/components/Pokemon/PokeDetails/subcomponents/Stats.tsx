import { getTrigram, typeColors } from "@/utils/utils";

interface StatsProps {
  stats: { base_stat: number; pokemon_v2_stat: { name: string } }[];
}

export interface StatsBadgeType {
  name: string;
  value: number;
  color: string;
  "data-testid": string;
}

const StatsBadge = ({
  name,
  value,
  color,
  "data-testid": testId,
}: StatsBadgeType) => {
  return (
    <div
      data-testid={testId}
      style={{
        backgroundColor: name === "TOT" ? "#8ba9e9" : "#f3f4f6",
      }}
      className="flex flex-col items-center rounded-full bg-gray-100 p-1"
    >
      <div
        style={{
          backgroundColor: color || "#777",
        }}
        className="bg-red-400 rounded-full w-[25px] h-[25px] aspect-square flex justify-center items-center"
      >
        <span className="text-[10px] font-bold text-white">{name}</span>
      </div>
      <span className="text-sm font-bold py-1 text-center">{value}</span>
    </div>
  );
};

const Stats = ({ stats }: StatsProps) => {
  const totalStats = stats.reduce(
    (total, current) => total + current.base_stat,
    0
  );

  return (
    <div data-testid="stats-section" className="flex flex-col w-full">
      <span className="text-center font-bold">Stats</span>
      <div className="flex flex-row w-full justify-between">
        {stats.map((stat) => {
          const color =
            typeColors[stat.pokemon_v2_stat.name.toLowerCase()] || "#777";
          return (
            <StatsBadge
              key={stat.pokemon_v2_stat.name}
              color={color}
              name={getTrigram(stat.pokemon_v2_stat.name)}
              value={stat.base_stat}
              data-testid={`stat-${stat.pokemon_v2_stat.name}`}
            />
          );
        })}
        <StatsBadge
          data-testid="stat-TOT"
          color="#6b98db"
          name="TOT"
          value={totalStats}
        />
      </div>
    </div>
  );
};

export default Stats;
