import React, { useEffect, useState,useContext } from 'react';
import "./pokemonDetails.css"
import { useParams, useNavigate  } from 'react-router-dom';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { UserContext } from '../../Context/Context';
import Pokemon from "../../Assests/pokemon-img.png"
import axios from 'axios';

const PokemonDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { updatedPokeList } = useContext(UserContext);
  const [pokemon, setPokemon] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { bookmarkStatus,setBookmarkStatus } = useContext(UserContext);

  useEffect(() => {
    // Find the pokemon by name from the updatedPokeList
    const foundPokemon = updatedPokeList.find(p => p.name === name);
    // console.log(foundPokemon);
    setPokemon(foundPokemon);
    // if (foundPokemon) {
    //   checkBookmark(foundPokemon.id);
    // }
  
    
    // console.log(foundPokemon);
  }, [name, updatedPokeList,bookmarkStatus]);


  // handle bookmark
  const handleBookmark = (pokemonId)=>{
    setBookmarkStatus(prevStatus => ({
      ...prevStatus,
      [pokemonId]: !prevStatus[pokemonId]
  }));
  }
  
  

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div>
      <header className="pokemon-list-header">
        <div className="left-header">
          <img src={Pokemon} alt="pokemon-icon" className="pokemon-img" />
          {/* <h1>Pokemon Gallery</h1> */}
        </div>
        <h1>Pokemon Details</h1>
        <div className="right-header">
          <button
            class="compare-button"
            onClick={() => navigate("/PokemonCompare")}
          >
            Compare Pokemon
          </button>
          <button class="bookmark-button" onClick={() => navigate("/bookmark")}>
            Bookmark
          </button>
          <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </header>
      
      <div className="pokemon-details-container">
        <div>
        <h1>{pokemon.name}</h1>
      <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
      
        </div>
      <div className="pokemon-details-sub-container">
        
        <p><strong>Height:</strong> {pokemon.height}</p>
        <p><strong>Weight:</strong> {pokemon.weight}</p>
        <p><strong>Types:</strong> {pokemon.types.join(', ')}</p>
        <p><strong>Abilities:</strong> {pokemon.abilities.join(', ')}</p>
        <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
        <p><strong>Group:</strong> {pokemon.group}</p>
        <p><strong>Habitat:</strong> {pokemon.habitat}</p>
        <p><strong>Location:</strong> {pokemon.locations ? pokemon.locations : 'Not available'}</p>
        <p><strong>Characteristics:</strong> {pokemon.characteristics.join(', ')}</p>
        <button className="bookmark-icon-detail-page-btn" onClick={() => handleBookmark(pokemon.id)}>
        {bookmarkStatus[pokemon.id] ? (
          <BookmarkIcon style={{ color: 'black',fontSize:"90px;"}} /> // Filled bookmark icon
        ) : (
          <BookmarkBorderIcon style={{ color: 'black', fontSize:"90px;"}} /> // Unfilled bookmark icon
        )}
      </button>
      </div>
      
      
    </div>
    </div>
  );
};

export default PokemonDetails;