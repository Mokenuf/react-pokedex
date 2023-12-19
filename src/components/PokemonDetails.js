import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TypeBadge from "./TypeBadge";
import Evolutions from "./Evolutions";
import FavIcon from "./FavIcon";

function PokemonDetais() {
  const [pokemon, setPokemon] = useState(null);
  const [evolutions, setEvolutions] = useState([]);
  const { pokemonId } = useParams();

  useEffect(() => {
    const processEvolutionData = async (chain) => {
      let tempEvolutions = [];
      let currentEvolution = chain;

      while (currentEvolution) {
        const evolutionId = extractIdFromUrl(currentEvolution.species.url);
        if (evolutionId && evolutionId !== pokemonId) {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${evolutionId}`
          );
          tempEvolutions.push({
            id: evolutionId,
            name: currentEvolution.species.name,
            sprite: response.data.sprites.front_default,
          });
        }
        currentEvolution =
          currentEvolution.evolves_to.length > 0
            ? currentEvolution.evolves_to[0]
            : null;
      }

      setEvolutions(tempEvolutions);
    };

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((response) => {
        setPokemon(response.data);
        return axios.get(response.data.species.url);
      })
      .then((response) => {
        return axios.get(response.data.evolution_chain.url);
      })
      .then((response) => {
        processEvolutionData(response.data.chain);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, [pokemonId]);

  const extractIdFromUrl = (url) => {
    const regex = /\/(\d+)\/$/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title text-capitalize">
          {pokemon.name} (#{pokemon.id})
          <FavIcon pokemon={pokemon} />
        </h2>
        <img
          src={pokemon.sprites.front_default}
          alt={`${pokemon.name} front`}
        />
        <img src={pokemon.sprites.back_default} alt={`${pokemon.name} back`} />
        <TypeBadge types={pokemon.types} />
        <Evolutions evolutions={evolutions} />
      </div>
    </div>
  );
}

export default PokemonDetais;
