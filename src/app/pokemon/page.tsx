"use client";

import { gql, useQuery } from "@apollo/client";
import { useMemo, useState } from "react";
import PokemonCard from "@/components/Pokemon/PokemonCard";
import SearchBar from "@/components/SearchBar";
import { PokeDetails } from "@/components/Pokemon/PokeDetails";
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
    <div className="bg-[#f7f8fc] py-12 w-screen h-screen lg:pl-40 flex flex-col lg:flex-row lg:space-y-0 space-y-8">
      <div className="w-full lg:w-[70%] flex-shrink-0 px-4 lg:px-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:space-x-4 space-y-4 sm:space-y-0">
          <SearchBar onChange={setSearchTerm} />
          <div className="flex flex-row gap-4 items-center justify-between sm:justify-end">
            <ReloadButton />
            <FilterButton
              onSelectType={setSelectedType}
              selectedType={selectedType}
            />
            <PageToggle />
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-16 pt-16 pb-8 overflow-y-auto pr-0 lg:pr-4
           justify-items-center sm:justify-items-stretch"
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

      <div className="w-full flex-1 flex flex-col justify-center items-center px-4 lg:px-0">
        {currentPokemon && <PokeDetails pokemonId={currentPokemon.id} />}
      </div>
    </div>
  );
};

export default PokemonPage;
