import type { Meta, StoryObj } from "@storybook/react";
import PokeDetailsCard from "./PokeDetailsCard";
import ApolloProvider from "@/lib/ApolloProvider";

const mockPokemon = {
  id: 25,
  name: "Pikachu",
  height: 4,
  weight: 60,
  pokemon_v2_pokemonsprites: [
    {
      sprites: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
      },
    },
  ],
  pokemon_v2_pokemontypes: [
    {
      pokemon_v2_type: { name: "electric" },
    },
  ],
  pokemon_v2_pokemonabilities: [
    {
      pokemon_v2_ability: { name: "static" },
    },
    {
      pokemon_v2_ability: { name: "lightning-rod" },
    },
  ],
  pokemon_v2_pokemonstats: [
    { base_stat: 35, pokemon_v2_stat: { name: "hp" } },
    { base_stat: 55, pokemon_v2_stat: { name: "attack" } },
    { base_stat: 40, pokemon_v2_stat: { name: "defense" } },
  ],
};

const mockSpecies = {
  pokemon_v2_pokemonspeciesflavortexts: [
    { flavor_text: "Pikachu is an electric-type Pokémon." },
  ],
  pokemon_v2_evolutionchain: {
    pokemon_v2_pokemonspecies: [
      {
        id: 25,
        name: "Pikachu",
        pokemon_v2_pokemons: [
          {
            pokemon_v2_pokemonsprites: [
              {
                sprites: {
                  front_default:
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
                },
              },
            ],
          },
        ],
        pokemon_v2_pokemonevolutions: [
          {
            evolved_species_id: 26,
            min_level: null,
          },
        ],
      },
      {
        id: 26,
        name: "Raichu",
        pokemon_v2_pokemons: [
          {
            pokemon_v2_pokemonsprites: [
              {
                sprites: {
                  front_default:
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png",
                },
              },
            ],
          },
        ],
        pokemon_v2_pokemonevolutions: [
          {
            evolved_species_id: 26,
            min_level: 20,
          },
        ],
      },
    ],
  },
};

const meta: Meta<typeof PokeDetailsCard> = {
  title: "Components/PokeDetailsCard",
  component: PokeDetailsCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ApolloProvider>
        <Story />
      </ApolloProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PokeDetailsCard>;

export const Default: Story = {
  args: {
    pokemon: mockPokemon,
    species: mockSpecies,
  },
};
