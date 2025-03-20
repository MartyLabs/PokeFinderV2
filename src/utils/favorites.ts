export const getFavorites = (): number[] => {
  if (typeof window !== "undefined") {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
  }
  return [];
};

export const addFavorite = (id: number) => {
  const favorites = getFavorites();
  if (!favorites.includes(id)) {
    localStorage.setItem("favorites", JSON.stringify([...favorites, id]));
  }
};

export const removeFavorite = (id: number) => {
  const favorites = getFavorites();
  const newFavorites = favorites.filter((favId) => favId !== id);
  localStorage.setItem("favorites", JSON.stringify(newFavorites));
};

export const isFavorite = (id: number): boolean => {
  return getFavorites().includes(id);
};
