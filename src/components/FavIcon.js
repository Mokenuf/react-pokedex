import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

function FavIcon({ pokemon }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.id === pokemon.id));
  }, [pokemon.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter((fav) => fav.id !== pokemon.id);
    } else {
      newFavorites = [
        ...favorites,
        {
          id: pokemon.id,
          name: pokemon.name,
          sprite: pokemon.sprites.front_default,
        },
      ];
    }
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <span
      onClick={toggleFavorite}
      style={{ cursor: "pointer", marginLeft: "10px" }}
    >
      <FontAwesomeIcon
        icon={isFavorite ? solidHeart : regularHeart}
        style={{ color: isFavorite ? "red" : "black" }}
      />
    </span>
  );
}

export default FavIcon;
