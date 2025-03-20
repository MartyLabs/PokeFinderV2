interface AbilitiesProps {
  abilities: string[];
}

const Abilities = ({ abilities }: AbilitiesProps) => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center">
        <span className="font-bold">Abilities</span>
        <div className="flex flex-row justify-center w-full space-x-2">
          {abilities.length > 0 ? (
            abilities.map((ability, index) => (
              <div
                key={index}
                className="bg-gray-200 flex flex-col items-center w-1/2 rounded-full py-2"
              >
                <span className="text-center">{ability.replace("-", " ")}</span>
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
