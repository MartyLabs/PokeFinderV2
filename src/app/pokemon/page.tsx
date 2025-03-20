"use client";

import { gql, useQuery } from "@apollo/client";
import PokemonCard from "@/components/PokemonCard";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import PokeDetails from "@/components/Pokemon/PokeDetails/PokeDetails";
import Spinner from "@/components/UI/Spinner";
import ReloadButton from "@/components/UI/ReloadButton";
import PageToggle from "@/components/UI/PageToggle";
import FilterButton from "@/components/UI/FilterButton";

const GET_POKEMONS = gql`
  query {
    pokemon_v2_pokemon(limit: 10) {
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

export default function PokemonPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPokemon, setCurrentPokemon] = useState();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { limit: 10 },
  });

  if (!data || !data.pokemon_v2_pokemon) {
    return (
      <p className="text-center text-gray-500">No Pokémon data available...</p>
    );
  }

  const filteredPokemons = data.pokemon_v2_pokemon
    .filter(
      (pokemon: any) =>
        pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase()) // Filtrage par nom
    )
    .filter((pokemon: any) =>
      selectedType
        ? pokemon.pokemon_v2_pokemontypes.some(
            (type: any) => type.pokemon_v2_type.name === selectedType
          )
        : true
    );

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

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
        <div className="flex flex-wrap flex-row justify-between gap-y-16 pt-16 pb-8 overflow-y-auto pr-4">
          {filteredPokemons.length > 0 ? (
            filteredPokemons.map((pokemon: any) => (
              <PokemonCard
                onClick={() => setCurrentPokemon(pokemon)}
                key={pokemon.id}
                pokemon={pokemon}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No Pokémon found...
            </p>
          )}
        </div>
      </div>
      <div className="w-full flex-1 flex flex-col justify-center items-center">
        {currentPokemon && <PokeDetails pokemonId={currentPokemon.id} />}
      </div>
    </div>
  );
}
