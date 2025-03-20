interface AbilitiesProps {
  abilities: string[];
}

const Abilities = ({ abilities }: AbilitiesProps) => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center">
        <span className="font-bold text-lg">Abilities</span>
        <div className="flex flex-row justify-center w-full gap-2 mt-2">
          {abilities.length > 0 ? (
            abilities.map((ability) => (
              <div
                key={ability}
                className="bg-gray-200 flex items-center justify-center w-1/2 rounded-full py-2 px-3 text-center text-sm font-medium text-gray-700"
              >
                {ability
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No Abilities Available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Abilities;
