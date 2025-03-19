import { useEffect, useState } from "react";
import Image from "next/image";
import { capitalize, typeColors } from "@/utils/utils";

interface PokemonCardProps {
  pokemon: {
    id: number;
    name: string;
    pokemon_v2_pokemonsprites: { sprites: { front_default: string } }[]; // Directement un objet
    pokemon_v2_pokemontypes: { pokemon_v2_type: { name: string } }[];
  };
  onClick?: () => void;
}

const PokemonCard = ({ pokemon, onClick }: PokemonCardProps) => {
  const { id, name, pokemon_v2_pokemonsprites, pokemon_v2_pokemontypes } =
    pokemon;

  const [sprite, setSprite] = useState<string>("/no_sprite.svg");

  useEffect(() => {
    if (
      pokemon_v2_pokemonsprites.length > 0 &&
      pokemon_v2_pokemonsprites[0].sprites
    ) {
      setSprite(
        pokemon_v2_pokemonsprites[0].sprites.front_default || "/no_sprite.svg"
      );
    }
  }, [pokemon_v2_pokemonsprites]);

  return (
    <div
      onClick={onClick}
      className="w-70 h-40 rounded-3xl cursor-pointer hover:border-2 hover:border-gray-300 hover:shadow-none transition-all duration-50 bg-white shadow-md flex flex-col items-center justify-center relative group"
    >
      {/* Image centrée en X et Y sur l'arrête du haut */}
      <Image
        src={sprite}
        alt={name}
        width={96}
        height={96}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain group-hover:scale-110 transition-transform duration-150"
      />

      {/* Contenu sous l'image */}
      <div className="flex flex-col items-center space-y-2.5 mt-8">
        <span className="font-semibold text-gray-400">N°{id}</span>
        <h2 className="font-bold text-2xl">{capitalize(name)}</h2>

        {/* Type(s) du Pokémon */}
        <div className="flex justify-center space-x-2">
          {pokemon_v2_pokemontypes.map((typeObj) => (
            <span
              key={typeObj.pokemon_v2_type.name}
              style={{
                backgroundColor:
                  typeColors[typeObj.pokemon_v2_type.name.toLowerCase()] ||
                  "#777",
              }}
              className="text-white rounded-lg px-2 py-0.5"
            >
              {capitalize(typeObj.pokemon_v2_type.name)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
