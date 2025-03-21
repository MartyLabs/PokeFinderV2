"use client";

import { useState, useEffect, useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import PokemonCard from "@/components/Pokemon/PokemonCard";
import Spinner from "@/components/UI/Spinner";
import SearchBar from "@/components/SearchBar";
import PokeDetails from "@/components/Pokemon/PokeDetails/PokeDetails";
import ReloadButton from "@/components/UI/ReloadButton";
import PageToggle from "@/components/UI/PageToggle";
import { getFavorites } from "@/utils/favorites";

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

const GET_POKEMON_BY_IDS = gql`
  query getPokemonsByIds($ids: [Int!]) {
    pokemon_v2_pokemon(where: { id: { _in: $ids } }) {
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

const FavoritesPage = () => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPokemon, setCurrentPokemon] = useState<PokemonType | null>(
    null
  );

  useEffect(() => {
    setFavoriteIds(getFavorites());
  }, []);

  const { loading, error, data } = useQuery<{
    pokemon_v2_pokemon: PokemonType[];
  }>(GET_POKEMON_BY_IDS, {
    variables: { ids: favoriteIds.length > 0 ? favoriteIds : [0] },
    skip: favoriteIds.length === 0,
  });

  const filteredFavorites = useMemo(() => {
    return (
      data?.pokemon_v2_pokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      ) || []
    );
  }, [data, searchTerm]);

  if (loading) return <Spinner />;
  if (error)
    return <p className="text-center text-gray-500">Error loading Pokémon</p>;

  return (
    <div className="bg-[#f7f8fc] pl-40 py-12 h-screen w-screen flex flex-row space-y-4">
      <div className="w-[70%] flex-shrink-0">
        <div className="flex flex-row justify-between items-center space-x-4">
          <SearchBar onChange={setSearchTerm} />
          <ReloadButton />
          <PageToggle />
        </div>

        <div className="flex flex-wrap flex-row justify-between gap-y-16 pt-16 pb-8 overflow-y-auto pr-4">
          {filteredFavorites.length === 0 ? (
            <p className="text-center text-gray-500">
              No matching Pokémon found.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredFavorites.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  onClick={() => setCurrentPokemon(pokemon)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex-1 flex flex-col justify-center items-center">
        {currentPokemon && <PokeDetails pokemonId={currentPokemon.id} />}
      </div>
    </div>
  );
};

export default FavoritesPage;
