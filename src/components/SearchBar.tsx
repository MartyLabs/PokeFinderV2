import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  onChange: (searchTerm: string) => void;
}

const SearchBar = ({ onChange }: SearchBarProps) => {
  return (
    <div className="w-full rounded-xl px-4 py-3 bg-white shadow-md focus:outline-none flex flex-row">
      <input
        className="w-full focus:outline-none"
        type="text"
        placeholder="Search Pokémon..."
        onChange={(e) => onChange(e.target.value)}
      />
      <button className="bg-[#fe5353] rounded-lg p-3 shadow-md cursor-pointer">
        <FaSearch className="text-white" />
      </button>
    </div>
  );
};

export default SearchBar;
