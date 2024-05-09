import React, { useState, useEffect } from 'react';
import "./PokemonCompare.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pokemon from "./../../Assests/pokemon-img.png";
import { Line } from 'react-chartjs-2';


const PokemonCompare = () => {
  const [pokemonList1, setPokemonList1] = useState([]);
  const [pokemonList2, setPokemonList2] = useState([]);
  const [selectedPokemon1, setSelectedPokemon1] = useState(null);
  const [selectedPokemon2, setSelectedPokemon2] = useState(null);
  const [pokemonData1, setPokemonData1] = useState(null);
  const [pokemonData2, setPokemonData2] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=100')
      .then(response => {
        setPokemonList1(response.data.results);
      })
      .catch(error => console.error('Error fetching first Pokémon list:', error));

    axios.get('https://pokeapi.co/api/v2/pokemon?offset=100&limit=100')
      .then(response => {
        setPokemonList2(response.data.results);
      })
      .catch(error => console.error('Error fetching second Pokémon list:', error));
  }, []);

  useEffect(() => {
    if (selectedPokemon1) {
      axios.get(selectedPokemon1)
        .then(response => {
          setPokemonData1(response.data);
          fetchMovesData(response.data.moves, setPokemonData1);
          setShowComparison(false);
        })
        .catch(error => console.error('Error fetching Pokémon data:', error));
    }
  }, [selectedPokemon1]);

  useEffect(() => {
    if (selectedPokemon2) {
      axios.get(selectedPokemon2)
        .then(response => {
          setPokemonData2(response.data);
          fetchMovesData(response.data.moves, setPokemonData2);
          setShowComparison(false);
        })
        .catch(error => console.error('Error fetching Pokémon data:', error));
    }
  }, [selectedPokemon2]);

  const handleCompareClick = () => {
    setShowComparison(true);
  };

  const fetchMovesData = async (moves, setPokemonData) => {
    const movesPromises = moves.slice(0, 5).map(move => axios.get(move.move.url));
    try {
      const movesResponses = await Promise.all(movesPromises);
      const movesData = movesResponses.map(response => response.data.name);
      setPokemonData(prevData => ({ ...prevData, moves: movesData }));
    } catch (error) {
      console.error('Error fetching moves data:', error);
    }
  };

  

  // const createChartData = (stats) => {
  //   return {
  //       labels: stats.map(stat => stat.stat.name),
  //       datasets: [{
  //         label: 'Stats',
  //         data: stats.map(stat => stat.base_stat),
  //         fill: false,
  //         borderColor: 'rgba(75, 192, 192, 1)',
  //         tension: 0.1
  //       }]
  //     };
  // };

  return (
    <>
<header className="pokemon-list-header">
        <div className="left-header">
          <img src={Pokemon} alt="pokemon-icon" className="pokemon-img" />
        </div>
        <h1>Compare Pokémon</h1>
        <div className="right-header">
          <button className="bookmark-button" onClick={() => navigate('/bookmark')}>
            Bookmark
          </button>
          <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </header>
    <div className="pokemon-compare-container">
      

      
      <div className="compare-selectors">
        <select value={selectedPokemon1} onChange={(e) => setSelectedPokemon1(e.target.value)}>
          <option value="">Select a Pokémon</option>
          {pokemonList1.map((pokemon) => (
            <option key={pokemon.name} value={pokemon.url}>
              {pokemon.name}
            </option>
          ))}
        </select>
        <select value={selectedPokemon2} onChange={(e) => setSelectedPokemon2(e.target.value)}>
          <option value="">Select a Pokémon</option>
          {pokemonList2.map((pokemon) => (
            <option key={pokemon.name} value={pokemon.url}>
              {pokemon.name}
            </option>
          ))}
        </select>
        <button className="compare-button" onClick={handleCompareClick}>
          Compare
        </button>
      </div>
      {showComparison && (
        <div className="comparison-details fade-in">
          {pokemonData1 && (
            <div className="pokemon-details">
              <h2 className="card-name">{pokemonData1.name}</h2>
              <img src={pokemonData1.sprites.front_default} alt={pokemonData1.name} className='compare-card-img'/>
              <p><span className="card-title">Types:</span> {pokemonData1.types.map((type) => type.type.name).join(', ')}</p>
              <p><span className="card-title">Abilities:</span> {pokemonData1.abilities.map((ability) => ability.ability.name).join(', ')}</p>
              <p>
                <span className="card-title">Height:</span> {pokemonData1.height} | Weight: {pokemonData1.weight}
              </p>
              <p><span className="card-title">Base Experience:</span> {pokemonData1.base_experience}</p>
              <p><span className="card-title">Moves:</span> {pokemonData1.moves.join(', ')}</p>
            </div>
          )}
          {pokemonData2 && (
            <div className="pokemon-details pokemon-details2">
              <h2 className="card-name">{pokemonData2.name}</h2>
              <img src={pokemonData2.sprites.front_default} alt={pokemonData2.name} />
              <p><span className="card-title">Types:</span> {pokemonData2.types.map((type) => type.type.name).join(', ')}</p>
              <p><span className="card-title">Abilities:</span> {pokemonData2.abilities.map((ability) => ability.ability.name).join(', ')}</p>
              <p>
               <span className="card-title">Height:</span> {pokemonData2.height} | Weight: {pokemonData2.weight}
              </p>
              <p><span className="card-title">Base Experience:</span> {pokemonData2.base_experience}</p>
              <p><span className="card-title">Moves:</span> {pokemonData2.moves.join(', ')}</p>
            </div>
          )}
        </div>
      )}
    </div>
    </>

  );
}

export default PokemonCompare;