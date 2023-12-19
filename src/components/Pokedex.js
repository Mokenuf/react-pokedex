import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FavoritesList from './FavoritesList';

function Pokedex() {
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    if (search) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}/`)
      .then(response => {
        setPokemon(response.data)
      })
      .catch(error => console.error("Error fetching data: ", error))
    }
  }, [search])

  return (
    <div className='container'>
      <input
        type="text"
        className="form-control my-3"
        placeholder="Search for a pokemon..."
        onChange={(e) => setSearch(e.target.value)}
      />
      {pokemon && (
        <div className='card my-3'>
          <Link to={`/pokemon/${pokemon.id}`} className='card-header text-capitalize'>{pokemon.name}</Link>
          <img src={pokemon.sprites.front_default} className="card-img-top" alt={pokemon.name} />
        </div>
      )}
      <FavoritesList />
    </div>
  )
}

export default Pokedex;