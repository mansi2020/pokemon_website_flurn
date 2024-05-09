// src/components/SearchPokemon.js
import React, { useState,useContext,useEffect } from 'react';
import "./pokemonSearch.css"
import axios from 'axios';
import { UserContext } from '../../Context/Context';

const PokemonSearch = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const context = useContext(UserContext);

  useEffect(() => {
    fetchPokemonList();
  }, []);

  let newPokemonList = [];
  const fetchPokemonList = async () => {
    setIsLoading(true);
    const promises = [];
    

    // Fetch data for the first 151 Pokémon
    for (let i = 1; i <=1000; i++) {
      const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${i}`;
      promises.push(axios.get(pokemonURL));
    }

    // Resolve all promises and update state with Pokémon data
    Promise.all(promises)
    .then((responses) => {
      newPokemonList = responses.map(response => {
        const { id, name, sprites, abilities, types } = response.data;
        return {
          id,
          name,
          image: sprites.front_default,
          abilities: abilities.map(ability => ability.ability.name),
          types: types.map(type => type.type.name)
        };
        console.log(newPokemonList);
      });

      context.setUpdatedPokeList(newPokemonList);
      setIsLoading(false);
      setError("");
    })
    .catch((error) => {
      setError(error.message);
      setIsLoading(false);
      console.error('Error fetching Pokémon:', error);
    });

      

  };
  
  // const handleSearch = () => {
    
  //   // const searchTerm = event.target.value.toLowerCase();
   
  //   const filtered = context.updatedPokeList.filter(pokemon =>
  //     pokemon.name.toLowerCase().includes(searchTerm)
  //   );
  //   setFilteredPokemonList(filtered);
  // };

  const changeSearchData=(e)=>{
    setSearchTerm(e.target.value)
     if(e.target.value == ""){
      return context.setShowData(true);
    }
    context.setShowData(false);
    const filtered = newPokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(e.target.value)
    );
    setFilteredPokemonList(filtered);
  }

  
  console.log(newPokemonList);
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e)=>changeSearchData(e)}
        placeholder="Enter Pokemon Name"
      />
      {/* <button onClick={handleSearch}>Search</button> */}

      {isLoading && <div className="loader-container">
      <div className="loader"></div>
          <p>Loading...</p>
        </div>}
      {error && <p>{error}</p>}

<div className="searchData">

      {filteredPokemonList && !context.showData  &&(
        filteredPokemonList.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-item">
            <img src={pokemon.image} alt={pokemon.name} />
            <div>
              <h3>{pokemon.name}</h3>
              <p>Abilities: {pokemon.abilities.join(', ')}</p>
              <p>Types: {pokemon.types.join(', ')}</p>
            </div>
          </div>
        ))
      )}
</div>
    </div>
  );
};

export default PokemonSearch;
