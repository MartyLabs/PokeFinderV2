import Image from "next/image";

interface EvolutionProps {
  evolution: {
    id: number;
    name: string;
    pokemon_v2_pokemons: {
      pokemon_v2_pokemonsprites: { sprites: { front_default: string } }[];
    }[];
    pokemon_v2_pokemonevolutions: {
      min_level: number | null;
      evolved_species_id: number;
    }[];
  }[];
}

const Evolution = ({
  evolution,
}: {
  evolution: EvolutionProps["evolution"];
}) => {
  return (
    <div
      data-testid="evolution-section"
      className="flex flex-row w-full justify-center items-center"
    >
      {evolution.map((evo, index) => {
        const sprite =
          evo.pokemon_v2_pokemons[0]?.pokemon_v2_pokemonsprites[0]?.sprites
            ?.front_default || "/placeholder.png";

        const nextEvolution = evolution[index + 1] ?? null;

        const minLevel =
          nextEvolution?.pokemon_v2_pokemonevolutions[0].min_level || "?";

        return (
          <div
            data-testid="evolution-stage"
            key={index}
            className="flex flex-row items-center"
          >
            <div>
              <Image
                data-testid={`evolution-img-${evo.name}`}
                src={sprite}
                alt={evo.name}
                width={72}
                height={72}
                className="w-18 h-18"
              />
              <span
                data-testid={`evolution-name-${evo.name}`}
                className="text-center text-sm font-bold"
              >
                {evo.name}
              </span>
            </div>

            {nextEvolution && (
              <div className="bg-gray-100 flex flex-row justify-center items-center w-full max-w-15 rounded-full py-1">
                <span className="text-xs font-bold">Lv. {minLevel}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Evolution;
