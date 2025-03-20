"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { capitalize, typeColors } from "@/utils/utils";
import Stats from "./Stats";
import Metrics from "./Metrics";
import Abilities from "./Abilities";
import Description from "./Description";
import Evolution from "./Evolution";
import { addFavorite, getFavorites, removeFavorite } from "@/utils/favorites";

interface PokemonType {
  id: number;
  name: string;
  height: number;
  weight: number;
  pokemon_v2_pokemonsprites: { sprites: { front_default: string } }[];
  pokemon_v2_pokemontypes: { pokemon_v2_type: { name: string } }[];
  pokemon_v2_pokemonabilities: { pokemon_v2_ability: { name: string } }[];
  pokemon_v2_pokemonstats: {
    base_stat: number;
    pokemon_v2_stat: { name: string };
  }[];
}

interface SpeciesType {
  pokemon_v2_pokemonspeciesflavortexts: { flavor_text: string }[];
  pokemon_v2_evolutionchain: {
    pokemon_v2_pokemonspecies: {
      id: number;
      name: string;
      pokemon_v2_pokemons: {
        pokemon_v2_pokemonsprites: { sprites: { front_default: string } }[];
      }[];
      pokemon_v2_pokemonevolutions: {
        min_level: number | null;
        evolved_species_id: number;
      }[];
    }[];
  };
}

interface PokeDetailsCardProps {
  pokemon: PokemonType;
  species: SpeciesType;
}

const PokeDetailsCard = ({ pokemon, species }: PokeDetailsCardProps) => {
  const {
    id,
    name,
    height,
    weight,
    pokemon_v2_pokemonsprites,
    pokemon_v2_pokemontypes,
  } = pokemon;

  const [favorite, setFavorite] = useState<boolean>(() =>
    getFavorites().includes(id)
  );
  const [animating, setAnimating] = useState<boolean>(false);

  const sprite =
    pokemon_v2_pokemonsprites[0]?.sprites?.front_default || "/placeholder.png";
  const description =
    species.pokemon_v2_pokemonspeciesflavortexts[0]?.flavor_text ||
    "No description available";
  const evolution =
    species.pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies || [];

  useEffect(() => {
    const favorites = getFavorites();
    setFavorite(favorites.includes(id));
  }, [id]);

  const toggleFavorite = () => {
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);

    if (favorite) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
    setFavorite(!favorite);
  };

  return (
    <div className="w-90 mt-12 h-auto rounded-3xl px-6 bg-white shadow-md flex flex-col items-center justify-center relative pb-5">
      <Image
        src={sprite}
        alt={name}
        width={216}
        height={216}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />

      <div className="flex flex-col items-center space-y-2.5 mt-24">
        <button
          onClick={toggleFavorite}
          className={`absolute cursor-pointer top-2 right-2 bg-white p-2 rounded-full shadow-md transition-transform duration-300 ease-in-out ${
            animating ? "scale-125 rotate-12" : "scale-100"
          }`}
        >
          {favorite ? (
            <FaStar className="text-yellow-500" />
          ) : (
            <FaRegStar className="text-gray-400" />
          )}
        </button>
        <span className="font-semibold text-gray-400">N°{id}</span>
        <h2 className="font-bold text-2xl">{capitalize(name)}</h2>

        <div className="flex justify-center space-x-2">
          {pokemon_v2_pokemontypes.map(({ pokemon_v2_type }) => (
            <span
              key={pokemon_v2_type.name}
              style={{
                backgroundColor:
                  typeColors[pokemon_v2_type.name.toLowerCase()] || "#777",
              }}
              className="text-white rounded-lg px-2 py-0.5"
            >
              {capitalize(pokemon_v2_type.name)}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        <Description description={description} />
        <Metrics height={height} weight={weight} />
        <Abilities
          abilities={pokemon.pokemon_v2_pokemonabilities.map(
            (a) => a.pokemon_v2_ability.name
          )}
        />
        <Stats stats={pokemon.pokemon_v2_pokemonstats} />

        {evolution.length > 1 ? (
          <Evolution evolution={evolution} />
        ) : (
          <p className="text-center text-gray-500">No evolution available</p>
        )}
      </div>
    </div>
  );
};

export default PokeDetailsCard;
