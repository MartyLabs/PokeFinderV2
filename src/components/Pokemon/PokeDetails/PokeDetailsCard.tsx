import Image from "next/image";
import { capitalize, typeColors } from "@/utils/utils";
import Stats from "./Stats";
import Metrics from "./Metrics";
import Abilities from "./Abilities";
import Description from "./Description";
import Evolution from "./Evolution";

interface PokemonDetailsProps {
  pokemon: {
    id: number;
    name: string;
    height: number;
    weight: number;
    pokemon_v2_pokemonsprites: { sprites: { front_default: string } }[];
    pokemon_v2_pokemontypes: { pokemon_v2_type: { name: string } }[];
    pokemon_v2_pokemonabilities: { pokemon_v2_ability: { name: string } }[];
    pokemon_v2_pokemonstats: {
      base_stat: number;
      pokemon_v2_stat: { name: string };
    }[];
  };
  species: {
    pokemon_v2_pokemonspeciesflavortexts: { flavor_text: string }[];
    pokemon_v2_evolutionchain: {
      pokemon_v2_pokemonspecies: {
        id: number;
        name: string;
        pokemon_v2_pokemons: {
          pokemon_v2_pokemonsprites: { sprites: { front_default: string } }[];
        }[];
      }[];
    };
  };
}

const PokeDetails = ({ pokemon, species }: PokemonDetailsProps) => {
  const {
    id,
    name,
    height,
    weight,
    pokemon_v2_pokemonsprites,
    pokemon_v2_pokemontypes,
  } = pokemon;

  const sprite =
    pokemon_v2_pokemonsprites[0]?.sprites?.front_default || "/placeholder.png";
  const description =
    species.pokemon_v2_pokemonspeciesflavortexts[0]?.flavor_text ||
    "No description available";
  const evolution =
    species.pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies || [];

  return (
    <div className="w-90 mt-12 h-auto rounded-3xl px-6 bg-white shadow-md flex flex-col items-center justify-center relative pb-5">
      <Image
        src={sprite}
        alt={name}
        width={216}
        height={216}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />

      <div className="flex flex-col items-center space-y-2.5 mt-24">
        <span className="font-semibold text-gray-400">N°{id}</span>
        <h2 className="font-bold text-2xl">{capitalize(name)}</h2>

        <div className="flex justify-center space-x-2">
          {pokemon_v2_pokemontypes.map((type) => (
            <span
              key={type.pokemon_v2_type.name}
              style={{
                backgroundColor:
                  typeColors[type.pokemon_v2_type.name.toLowerCase()] || "#777",
              }}
              className="text-white rounded-lg px-2 py-0.5"
            >
              {capitalize(type.pokemon_v2_type.name)}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        <Description description={description} />
        <Metrics height={height} weight={weight} />
        <Abilities
          abilities={pokemon.pokemon_v2_pokemonabilities.map(
            (a) => a.pokemon_v2_ability.name
          )}
        />
        <Stats stats={pokemon.pokemon_v2_pokemonstats} />
        {evolution.length > 1 ? (
          <Evolution evolution={evolution} />
        ) : (
          <p className="text-center text-gray-500">No evolution available</p>
        )}
      </div>
    </div>
  );
};

export default PokeDetails;
