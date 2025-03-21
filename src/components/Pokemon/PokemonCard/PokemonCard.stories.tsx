import type { Meta, StoryObj } from "@storybook/react";

import ApolloProvider from "@/lib/ApolloProvider";
import PokemonCard from "./PokemonCard";

const mockPokemon = {
  id: 25,
  name: "Pikachu",
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
};

const meta: Meta<typeof PokemonCard> = {
  title: "Components/PokemonCard",
  component: PokemonCard,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
  decorators: [
    (Story) => (
      <ApolloProvider>
        <Story />
      </ApolloProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PokemonCard>;

export const Default: Story = {
  args: {
    pokemon: mockPokemon,
  },
};
