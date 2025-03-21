"use client";

import { gql, useQuery } from "@apollo/client";
import { useMemo, useState } from "react";
import PokemonCard from "@/components/Pokemon/PokemonCard";
import SearchBar from "@/components/SearchBar";
import PokeDetails from "@/components/Pokemon/PokeDetails/PokeDetails";
import Spinner from "@/components/UI/Spinner";
import ReloadButton from "@/components/UI/ReloadButton";
import PageToggle from "@/components/UI/PageToggle";
import FilterButton from "@/components/UI/FilterButton";
import { motion } from "framer-motion";

interface PokemonType {
  id: number;
  name: string;
  pokemon_v2_pokemonsprites: {
    sprites: { front_default: string };
  }[];
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: { name: string };
  }[];
}

const GET_POKEMONS = gql`
  query getPokemons($limit: Int!) {
    pokemon_v2_pokemon(limit: $limit) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

const PokemonPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPokemon, setCurrentPokemon] = useState<PokemonType | null>(
    null
  );
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const { loading, error, data } = useQuery<{
    pokemon_v2_pokemon: PokemonType[];
  }>(GET_POKEMONS, {
    variables: { limit: 10 },
  });

  const filteredPokemons = useMemo(() => {
    if (!data || !data.pokemon_v2_pokemon) return [];
    return data.pokemon_v2_pokemon
      .filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
      .filter((pokemon) =>
        selectedType
          ? pokemon.pokemon_v2_pokemontypes.some(
              (type) => type.pokemon_v2_type.name === selectedType
            )
          : true
      );
  }, [data, searchTerm, selectedType]);

  if (loading) return <Spinner />;
  if (error)
    return <p className="text-center text-gray-500">Error: {error.message}</p>;
  if (!data || !data.pokemon_v2_pokemon) {
    return (
      <p className="text-center text-gray-500">No Pokémon data available...</p>
    );
  }

  return (
    <div className="bg-[#f7f8fc] pl-40 py-12 h-screen w-screen flex flex-row space-y-4">
      <div className="w-[70%] flex-shrink-0">
        <div className="flex flex-row justify-between items-center space-x-4">
          <SearchBar onChange={setSearchTerm} />
          <ReloadButton />
          <FilterButton
            onSelectType={setSelectedType}
            selectedType={selectedType}
          />
          <PageToggle />
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-16 pt-16 pb-8 overflow-y-auto pr-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredPokemons.length > 0 ? (
            filteredPokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onClick={() => setCurrentPokemon(pokemon)}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No Pokémon found...
            </p>
          )}
        </motion.div>
      </div>

      <div className="w-full flex-1 flex flex-col justify-center items-center">
        {currentPokemon && <PokeDetails pokemonId={currentPokemon.id} />}
      </div>
    </div>
  );
};

export default PokemonPage;
