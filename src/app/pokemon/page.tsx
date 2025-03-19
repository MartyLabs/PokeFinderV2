"use client";

import { gql, useQuery } from "@apollo/client";
import PokemonCard from "@/components/PokemonCard";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";

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
  const { loading, error, data } = useQuery(GET_POKEMONS);
  const [searchTerm, setSearchTerm] = useState<string>("");

  if (!data || !data.pokemon_v2_pokemon) {
    return (
      <p className="text-center text-gray-500">No Pokémon data available...</p>
    );
  }

  const filteredPokemons = data.pokemon_v2_pokemon.filter((pokemon: any) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Pokémon Explorer</h1>

      <SearchBar onChange={setSearchTerm} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon: any) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No Pokémon found...
          </p>
        )}
      </div>
    </div>
  );
}
