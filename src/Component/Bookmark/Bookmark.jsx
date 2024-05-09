import React, { useContext, useEffect, useState } from 'react';
import "./Bookmark.css"
import { UserContext } from './../../Context/Context';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Link, useNavigate } from "react-router-dom";
import Pokemon from "./../../Assests/pokemon-img.png"

const Bookmarks = () => {
  const { updatedPokeList, bookmarkStatus, setBookmarkStatus } = useContext(UserContext);
  const [pokemonData, setPokemonData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBookmarkedPokemonDetails();
  }, [bookmarkStatus]);

  const getBookmarkedPokemonDetails = () => {
    const bookmarkedIds = Object.keys(bookmarkStatus).filter(id => bookmarkStatus[id]);
    console.log("id", bookmarkedIds.join(","));
    console.log(updatedPokeList);
    
    const bookmarkedPokemonDetails = updatedPokeList.filter(pokemon => bookmarkedIds.join(",").includes(pokemon.id));
    const uniquePokemonArray = filterUniquePokemon(bookmarkedPokemonDetails);

    setPokemonData(uniquePokemonArray)
    // console.log(uniquePokemonArray);
  }

// Function to filter and transform the Pokémon data into an array of unique Pokémon objects
const filterUniquePokemon = (data) => {
    const uniquePokemonMap = new Map();

    data.forEach(pokemon => {
      const id = pokemon.id;
      if (!uniquePokemonMap.has(id)) {
        uniquePokemonMap.set(id, {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.image,
          abilities: pokemon.abilities,
          types: pokemon.types,
          habitat:pokemon.habitat,
          locations:pokemon.locations,
          characteristics:pokemon.characteristics,
        });
      }
    });
  
    // Convert the values of the map (which are the unique Pokémon objects) into an array
    const uniquePokemonArray = Array.from(uniquePokemonMap.values());
    return uniquePokemonArray;
  };

 
   
  // toggle bookmark
  const toggleBookmark = (pokemonId) => {
    setBookmarkStatus(prevStatus => {
      const newStatus = {
        ...prevStatus,
        [pokemonId]: !prevStatus[pokemonId]
      };
      setBookmarkStatus(newStatus); // Update bookmark status
      getBookmarkedPokemonDetails(); // Update displayed data
      return newStatus;
    });
  };

  return (
    <div>
      <header className="pokemon-list-header">
        <div className="left-header">
          <img src={Pokemon} alt="pokemon-icon" className="pokemon-img" />
        </div>
        <h1>Bookmarked Pokémon</h1>
        <div className="right-header">
        <button
            class="compare-button"
            onClick={() => navigate("/PokemonCompare")}
          >
            Compare Pokemon
          </button>
          <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </header>
      <div className="bookmark-card-container">

      {pokemonData.length == 0?<p className='no-bookmark-message'>You haven't bookmarked any Pokémon yet!</p> :pokemonData.map(pokemon => (
        <div key={pokemon.id} className="pokemon-item">
        <Link
          to={`/detail/${pokemon.name}`}
          state={{ isBookmarked: bookmarkStatus[pokemon.id] }}
        >
          <img src={pokemon.image} alt={pokemon.name} className="card-img"/>
          <div>
            <h3 className="card-name">{pokemon.name}</h3>
            <p className="card-ability"><span className="card-title">Abilities:</span> {pokemon.abilities.join(", ")}</p>
            <p className="card-types"><span className="card-title">Types:</span> {pokemon.types.join(", ")}</p>
            <p className="card-group"><span className="card-title">Group:</span> {pokemon.group}</p>
            {/* <p>Species: {pokemon.species}</p> */}
            <p className="card-habitant"><span className="card-title">Habitat:</span> {pokemon.habitat}</p>
            {pokemon.locations ? (
              <p className="card-location"><span className="card-title">Location:</span> {pokemon.locations}</p>
            ) : (
              <p className="card-location"><span className="card-title">Location</span>: Not avilable</p>
            )}
            <p className="card-char"><span className="card-title">Characteristics:</span> {pokemon.characteristics[0]}</p>
            
          </div>
        </Link>
        <div>
          <button onClick={() => toggleBookmark(pokemon.id)} className="card-bookmark-btn">
            {bookmarkStatus[pokemon.id] ? (
              <BookmarkIcon style={{ color: "black" }} /> // Filled bookmark icon
            ) : (
              <BookmarkBorderIcon style={{ color: "black" }} /> // Unfilled bookmark icon
            )}
          </button>
        </div>
      </div>
      ))}
      </div>
    </div>
  );
};

export default Bookmarks;