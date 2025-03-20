"use client";

import { usePathname, useRouter } from "next/navigation";
import { FaStar, FaListUl } from "react-icons/fa";

const PageToggle = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isFavoritesPage = pathname === "/favorites";

  const handleToggle = () => {
    router.push(isFavoritesPage ? "/pokemon" : "/favorites");
  };

  return (
    <button
      onClick={handleToggle}
      className="cursor-pointer inline-flex items-center space-x-2 bg-white shadow-md px-4 py-3 rounded-xl transition-all duration-300 hover:bg-gray-100 whitespace-nowrap"
    >
      {isFavoritesPage ? (
        <>
          <FaListUl className="text-gray-600" />
          <span className="text-gray-800 font-medium">All Pokémon</span>
        </>
      ) : (
        <>
          <FaStar className="text-yellow-500" />
          <span className="text-gray-800 font-medium">Favorites</span>
        </>
      )}
    </button>
  );
};

export default PageToggle;
