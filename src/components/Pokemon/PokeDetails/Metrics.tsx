interface MetricsProps {
  height: number;
  weight: number;
}

const Metrics = ({ height, weight }: MetricsProps) => {
  return (
    <div className="flex flex-row w-full space-x-2">
      <div className="w-1/2 flex flex-col items-center">
        <span className="font-bold">Height</span>
        <div className="bg-gray-200 rounded-full py-2 w-full text-center">
          <span>{height / 10}m</span>
        </div>
      </div>
      <div className="w-1/2 flex flex-col items-center">
        <span className="font-bold">Weight</span>
        <div className="bg-gray-200 rounded-full py-2 w-full text-center">
          <span>{weight / 10}kg</span>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
