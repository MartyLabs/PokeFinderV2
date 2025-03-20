"use client";

import { useQuery, gql } from "@apollo/client";
import PokeDetailsCard from "./PokeDetailsCard";
import Spinner from "@/components/UI/Spinner";

const GET_POKEMON_DETAILS = gql`
  query getPokemonDetails($id: Int!) {
    pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
      id
      name
      height
      weight
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
    }
    pokemon_v2_pokemonspecies(where: { id: { _eq: $id } }) {
      pokemon_v2_pokemonspeciesflavortexts(
        where: { language_id: { _eq: 9 } }
        limit: 1
      ) {
        flavor_text
      }
      pokemon_v2_evolutionchain {
        pokemon_v2_pokemonspecies {
          id
          name
          pokemon_v2_pokemons {
            pokemon_v2_pokemonsprites {
              sprites
            }
          }
          pokemon_v2_pokemonevolutions {
            min_level
            evolved_species_id
          }
        }
      }
    }
  }
`;

interface PokeDetailsProps {
  pokemonId: number;
}

export default function PokeDetails({ pokemonId }: PokeDetailsProps) {
  const { loading, error, data } = useQuery(GET_POKEMON_DETAILS, {
    variables: { id: Number(pokemonId) },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <PokeDetailsCard
      pokemon={data.pokemon_v2_pokemon[0]}
      species={data.pokemon_v2_pokemonspecies[0]}
    />
  );
}
