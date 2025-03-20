"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { FaFilter } from "react-icons/fa";
import { GET_TYPES } from "@/graphql/queries";

interface FilterButtonProps {
  onSelectType: (type: string | null) => void;
  selectedType: string | null;
}

const FilterButton = ({ onSelectType, selectedType }: FilterButtonProps) => {
  const { data } = useQuery(GET_TYPES);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const types = data?.pokemon_v2_type || [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center space-x-2 bg-white shadow-md px-4 py-3 rounded-xl transition-all duration-300 hover:bg-gray-100"
      >
        <FaFilter className="text-gray-600" />
        <span className="text-gray-800 font-medium">
          {selectedType
            ? selectedType.charAt(0).toUpperCase() + selectedType.slice(1)
            : "Filter"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-40 bg-white shadow-md rounded-xl p-2">
          <button
            className={`w-full text-left px-2 py-1 rounded-md ${
              selectedType === null
                ? "bg-gray-200 text-gray-600 font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => {
              onSelectType(null);
              setIsOpen(false);
            }}
          >
            All Types
          </button>
          {types.map((type: { name: string }) => (
            <button
              key={type.name}
              className={`w-full text-left px-2 py-1 rounded-md ${
                selectedType === type.name
                  ? "bg-gray-200 text-gray-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => {
                onSelectType(type.name);
                setIsOpen(false);
              }}
            >
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterButton;
