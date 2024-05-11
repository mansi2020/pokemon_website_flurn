import React, { useState, useEffect, useContext,useRef } from "react";
import axios from "axios";
import "./pokemonList.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { UserContext } from "../../Context/Context";
import { Link, useNavigate } from "react-router-dom";

import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SearchIcon from "@mui/icons-material/Search";
import Pokemon from "./../../Assests/pokemon-img.png";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([
    ...pokemonList,
  ]);
  const [selectedAbility, setSelectedAbility] = useState("");
  const [selectedHabitat, setSelectedHabitat] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCharacteristic, setSelectedCharacteristic] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const pokemonGridRef = useRef(null);

  const [offset0, setOffset0] = useState(1);
  const [offset, setOffset] = useState(20);
  const navigate = useNavigate();
  const limit = 20;

  const { updatedPokeList, setUpdatedPokeList, setShowData } =
    useContext(UserContext);
  const { bookmarkStatus, setBookmarkStatus } = useContext(UserContext);
  // console.log(context);

  useEffect(() => {
    fetchPokemonList();
  }, [bookmarkStatus]);

  const fetchPokemonList = async () => {
    setIsLoading(true);
    
    const promises = [];
    for (let i = offset0; i <= offset; i++) {
      const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${i}`;
      promises.push(axios.get(pokemonURL));
    }

    try {
      const responses = await Promise.all(promises);
      const newPokemonList = [];
      for (const response of responses) {
        const pokemonData = response.data;
        const speciesData = await axios.get(pokemonData.species.url);
        const habitatData = await axios.get(speciesData.data.habitat.url);
        const locationData = await axios.get(
          pokemonData.location_area_encounters
        );

        const characteristics = speciesData.data.flavor_text_entries
          .filter((entry) => entry.language.name === "en")
          .map((entry) => entry.flavor_text)
          .slice(0, 3);

        // Extract location information from the locationData
        const locations = locationData.data[0]?.location_area?.name;

        // Extract group of pokemon
        // Determine a group based on the primary type
        const primaryType = pokemonData.types[0].type.name;
        let group;

        switch (primaryType) {
          case "grass":
          case "fire":
          case "water":
            group = "Starter Pokémon";
            break;
          case "electric":
          case "ice":
          case "flying":
            group = "Legendary Pokémon";
            break;
          default:
            group = "Other Pokémon";
            break;
        }

        const pokemonInfo = {
          id: pokemonData.id,
          name: pokemonData.name,
          image: pokemonData.sprites.front_default,
          abilities: pokemonData.abilities.map(
            (ability) => ability.ability.name
          ),
          types: pokemonData.types.map((type) => type.type.name),
          habitat: habitatData.data.name,
          // species: speciesData.data.name,
          group: group,
          locations: locations,
          height: pokemonData.height,
          weight: pokemonData.weight,
          base_experience: pokemonData.base_experience,
          characteristics: characteristics,
        };
        newPokemonList.push(pokemonInfo);
      }
      setPokemonList((prevList) => [...prevList, ...newPokemonList]);
      setFilteredPokemonList((prevList) => [...prevList, ...newPokemonList]);
      setUpdatedPokeList((prevList) => [...prevList, ...newPokemonList]);
      setOffset((prevOffset) => prevOffset + 20);
      setOffset0((prevOffset) => prevOffset + 20);
     
    } catch (error) {
      console.error("Error fetching or processing Pokémon:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // filter by pokemon name
  const changeSearchData = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value == "") {
      setShowData(true);
      setFilteredPokemonList(pokemonList);
      return;
    }
    setShowData(false);
    const filterData = [...pokemonList];
    const filtered = filterData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(e.target.value)
    );
    setFilteredPokemonList(filtered);
  };

  // filter by pokemon ability
  const filterByAbility = (e) => {
    setSelectedAbility(e.target.value);
    if (e.target.value == "") {
      setShowData(true);
      setFilteredPokemonList(pokemonList);
      return;
    }
    setShowData(false);
    const filterData = [...pokemonList];
    const filtered = filterData.filter((pokemon) =>
      pokemon.abilities.join(", ").toLowerCase().includes(e.target.value)
    );
    setFilteredPokemonList(filtered);
  };

  // filter by pokemon habitant
  const filterByHabitat = (e) => {
    setSelectedHabitat(e.target.value);
    if (e.target.value === "") {
      setShowData(true);
      setFilteredPokemonList(pokemonList);
      return;
    }
    setShowData(false);
    const filtered = pokemonList.filter((pokemon) =>
      pokemon.habitat.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredPokemonList(filtered);
  };

  // filter by pokemon location
  const filterByLocation = (e) => {
    setSelectedLocation(e.target.value);
    if (e.target.value === "") {
      setShowData(true);
      setFilteredPokemonList(pokemonList);
      return;
    }
    setShowData(false);
    const filtered = pokemonList.filter(
      (pokemon) =>
        pokemon.locations &&
        pokemon.locations.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredPokemonList(filtered);
  };

  // Filter by pokemon characteristic
  const filterByCharacteristic = (e) => {
    setSelectedCharacteristic(e.target.value);
    if (e.target.value === "") {
      setShowData(true);
      setFilteredPokemonList(pokemonList);
      return;
    }
    setShowData(false);
    const filtered = pokemonList.filter((pokemon) =>
      pokemon.characteristics
        .join(", ")
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setFilteredPokemonList(filtered);
  };

  // Filter by pokemon group
  const filterByGroup = (e) => {
    setSelectedGroup(e.target.value);
    if (e.target.value === "") {
      setShowData(true);
      setFilteredPokemonList(pokemonList);
      return;
    }
    setShowData(false);
    const filtered = pokemonList.filter((pokemon) =>
      pokemon.group.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredPokemonList(filtered);
  };

  // toggle bookmark
  const toggleBookmark = (pokemonId) => {
    setBookmarkStatus((prevStatus) => ({
      ...prevStatus,
      [pokemonId]: !prevStatus[pokemonId],
    }));
  };

  return (
    <div className="pokemon-list">
      <header className="pokemon-list-header">
        <div className="left-header">
          <img src={Pokemon} alt="pokemon-icon" className="pokemon-img" />
          {/* <h1>Pokemon Gallery</h1> */}
        </div>
        <div className="search-pokemon">
          <SearchIcon style={{ color: "rgb(49, 108, 218)" }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => changeSearchData(e)}
            placeholder="Enter Pokemon Name"
          />
        </div>
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
        </div>
      </header>

      <div className="filter-data">
        <div className="filter-data-sub">
          <SearchIcon style={{ color: "#b6b6b6" }} />
          <input
            type="text"
            value={selectedAbility}
            onChange={(e) => filterByAbility(e)}
            placeholder="Enter Ability"
            className="filter-input"
          />
        </div>

        <div className="filter-data-sub">
          <SearchIcon style={{ color: "#b6b6b6" }} />
          <input
            type="text"
            value={selectedHabitat}
            onChange={(e) => filterByHabitat(e)}
            placeholder="Enter Habitat"
            className="filter-input"
          />
        </div>

        <div className="filter-data-sub">
          <SearchIcon style={{ color: "#b6b6b6" }} />
          <input
            type="text"
            value={selectedLocation}
            onChange={(e) => filterByLocation(e)}
            placeholder="Enter Location"
            className="filter-input"
          />
        </div>

        <div className="filter-data-sub">
          <SearchIcon style={{ color: "#b6b6b6" }} />
          <input
            type="text"
            value={selectedGroup}
            onChange={(e) => filterByGroup(e)}
            placeholder="Enter Group"
            className="filter-input"
          />
        </div>

        <div className="filter-data-sub">
          <SearchIcon style={{ color: "#b6b6b6" }} />
          <input
            type="text"
            value={selectedCharacteristic}
            onChange={(e) => filterByCharacteristic(e)}
            placeholder="Enter Characteristic"
            className="filter-input"
          />
        </div>
      </div>
      {/* {isLoading ? (
          <div className="loader"></div>
        ) : null} */}
      <InfiniteScroll
        dataLength={filteredPokemonList.length}
        next={fetchPokemonList}
        hasMore={true}
        // loader={<h4>Loading...</h4>}
        endMessage={<p>No more Pokémon to load.</p>}
        scrollThreshold="40px"
      >
        
          <div className="pokemon-grid">
            {filteredPokemonList &&
              filteredPokemonList.map((pokemon) => (
                <div key={pokemon.id} className="pokemon-item">
                  <Link
                    to={`/detail/${pokemon.name}`}
                    state={{ isBookmarked: bookmarkStatus[pokemon.id] }}
                  >
                    <img
                      src={pokemon.image}
                      alt={pokemon.name}
                      className="card-img"
                    />
                    <div>
                      <h3 className="card-name">{pokemon.name}</h3>
                      <p className="card-ability">
                        <span className="card-title">Abilities:</span>{" "}
                        {pokemon.abilities.join(", ")}
                      </p>
                      <p className="card-types">
                        <span className="card-title">Types:</span>{" "}
                        {pokemon.types.join(", ")}
                      </p>
                      <p className="card-group">
                        <span className="card-title">Group:</span>{" "}
                        {pokemon.group}
                      </p>
                      {/* <p>Species: {pokemon.species}</p> */}
                      <p className="card-habitant">
                        <span className="card-title">Habitat:</span>{" "}
                        {pokemon.habitat}
                      </p>
                      {pokemon.locations ? (
                        <p className="card-location">
                          <span className="card-title">Location:</span>{" "}
                          {pokemon.locations}
                        </p>
                      ) : (
                        <p className="card-location">
                          <span className="card-title">Location</span>: Not
                          avilable
                        </p>
                      )}
                      <p className="card-char">
                        <span className="card-title">Characteristics:</span>{" "}
                        {pokemon.characteristics[0]}
                      </p>
                    </div>
                  </Link>
                  <div>
                    <button
                      onClick={() => toggleBookmark(pokemon.id)}
                      className="card-bookmark-btn"
                    >
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
       


      </InfiniteScroll>
    </div>
  );
};

export default PokemonList;
