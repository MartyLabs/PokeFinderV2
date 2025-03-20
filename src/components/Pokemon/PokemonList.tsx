import PokemonCard from "@/components/PokemonCard";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import PokeDetails from "@/components/Pokemon/PokeDetails/PokeDetails";
import Spinner from "@/components/UI/Spinner";

interface PokemonPageProps {
  data: any;
  loading: boolean;
  error: any;
}

export default function PokemonList({
  data,
  loading,
  error,
}: PokemonPageProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPokemon, setCurrentPokemon] = useState();

  if (!data || !data.pokemon_v2_pokemon) {
    return (
      <p className="text-center text-gray-500">No Pokémon data available...</p>
    );
  }

  const filteredPokemons = data.pokemon_v2_pokemon.filter((pokemon: any) =>
    pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-[#f7f8fc] pl-40 py-12 h-screen w-screen flex flex-row space-y-4">
      <div className="w-[70%] flex-shrink-0">
        <SearchBar onChange={setSearchTerm} />
        <div className="flex flex-wrap flex-row justify-between gap-y-16 pt-16 pb-8 overflow-y-auto pr-4">
          {filteredPokemons.length > 0 ? (
            filteredPokemons.map((pokemon: any) => (
              <PokemonCard
                onClick={() => setCurrentPokemon(pokemon)}
                key={pokemon.id}
                pokemon={pokemon}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No Pokémon found...
            </p>
          )}
        </div>
      </div>
      <div className="w-full flex-1 flex flex-col justify-center items-center">
        {currentPokemon && <PokeDetails pokemonId={currentPokemon.id} />}
      </div>
    </div>
  );
}
