import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query getPokemons($limit: Int!, $type: String) {
    pokemon_v2_pokemon(
      limit: $limit
      where: {
        pokemon_v2_pokemontypes: { pokemon_v2_type: { name: { _eq: $type } } }
      }
    ) {
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

export const GET_TYPES = gql`
  query getTypes {
    pokemon_v2_type {
      name
    }
  }
`;
