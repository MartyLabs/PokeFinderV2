"use client"; // Important pour utiliser useQuery avec App Router
import { useQuery, gql } from "@apollo/client";

const GET_POKEMONS = gql`
  query {
    pokemon_v2_pokemon(limit: 10) {
      id
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

export default function PokemonPage() {
  const { loading, error, data } = useQuery(GET_POKEMONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Pokémon Explorer</h1>
      <ul>
        {data.pokemon_v2_pokemon.map((pokemon: any) => (
          <li key={pokemon.id}>
            <p>{pokemon.name}</p>
            <p>
              Type:{" "}
              {pokemon.pokemon_v2_pokemontypes
                .map((t: any) => t.pokemon_v2_type.name)
                .join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
