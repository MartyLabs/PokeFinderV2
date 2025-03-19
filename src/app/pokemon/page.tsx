"use client";

import { gql, useQuery } from "@apollo/client";
import PokemonCard from "@/components/PokemonCard";

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Pokémon Explorer</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.pokemon_v2_pokemon.map((pokemon: any) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}
