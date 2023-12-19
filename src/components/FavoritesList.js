import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import '../styles/FavoritesList.css';


function FavoritesList() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    storedFavorites.sort((a, b) => a.id - b.id)
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="card">
      <div className="card-body p-0">
        <h3 className="card-title p-2">My Favorite Pokemon</h3>
        {favorites.length === 0 ? (
          <h2 className="text-center py-2">You have no favorites yet!</h2>
        ) : (
          <table className="table table-hover m-0">
            <tbody>
              {favorites.map((pokemon) => (
                <tr key={pokemon.id}>
                  <td>#{pokemon.id}</td>
                  <td>
                    <Link
                      to={`/pokemon/${pokemon.id}`}
                      className="text-capitalize fw-bold text-reset text-decoration-none link"
                    >
                      {pokemon.name}
                    </Link>
                  </td>
                  <td>
                    <img
                      src={pokemon.sprite}
                      alt={pokemon.name}
                      className="img-fluid"
                      style={{ width: "40px", height: "40px" }}
                    />
                  </td>
                  <td className="text-end">
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => removeFavorite(pokemon.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default FavoritesList;
