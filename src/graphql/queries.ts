import { gql } from "@apollo/client";

export const GET_TYPES = gql`
  query getTypes {
    pokemon_v2_type {
      name
    }
  }
`;
