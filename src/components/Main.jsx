import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Body from "./Body.jsx";
import { capitalizeWord, getAPIData } from "../js/functions.js";

import "../css/main.css";

function Main() {
  /* states */
  const [allPokemons, setAllPokemons] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchedPokemons, setSearchedPokemons] = useState([]);

  /* general variables */
  const pokemonsNumber = 100;
  const BASE_URL = `https://pokeapi.co/api/v2/pokemon/?limit=${pokemonsNumber}&offset=0`;
  const POKE_IMAGES_URL =
    "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";

  useEffect(() => {
    async function getPokemonsAsync(url) {
      const allPokemons = await getPokemons(url);
      setAllPokemons(allPokemons);
    }
    getPokemonsAsync(BASE_URL);
  }, []);

  function handleQueryStringChange(query) {
    if (!query) {
      setIsSearching(false);
      return;
    }

    const pokemons = allPokemons.slice();
    const _searchedPokemons = [];
    const query_str = query.toLowerCase();
    pokemons.forEach((pokemon) => {
      const _pokemon = pokemon.name.toLowerCase();
      if (_pokemon.indexOf(query_str) >= 0) {
        _searchedPokemons.push(pokemon);
      }
    });
    setIsSearching(true);
    setSearchedPokemons(_searchedPokemons);
  }

  async function getPokemons(url) {
    let pokemons = [];
    try {
      const json = await getAPIData(url);
      for (let i = 0; i < json.results.length; i++) {
        const result = json.results[i];
        const info = await getInfoPokemon(result.url);
        if (info.image != null) pokemons.push(info);
      }
    } catch (error) {
      console.log(error);
    }
    return pokemons;
  }

  async function getInfoPokemon(pokemon_url) {
    try {
      const json = await getAPIData(pokemon_url);
      const _id = json.id.toString();
      const id =
        _id.length === 1 ? `00${_id}` : _id.length === 2 ? `0${_id}` : _id;
      let types = json.types.map((type) => capitalizeWord(type.type.name));
      return {
        name: capitalizeWord(json.name),
        image: POKE_IMAGES_URL + `${id}.png`,
        id: id,
        types: types.reverse(),
      };
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="document">
      <Header onQueryStringChange={handleQueryStringChange}></Header>
      <Body pokemons={!isSearching ? allPokemons : searchedPokemons} />
    </div>
  );
}
export default Main;
