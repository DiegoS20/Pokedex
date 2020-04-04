import React from "react";
import Header from "./Header.js";
import Body from "./Body.js";
import { capitalizeWord, getAPIData } from "../js/functions.js";

import "../css/main.css";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPokemons: [],
      isSearching: false,
      searchedPokemons: [],
    };

    this.BASE_URL = "https://pokeapi.co/api/v2/pokemon/?limit=150&offset=0";
    this.POKE_IMAGES_URL =
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
  }

  handleQueryStringChange(query) {
    if (!query) {
      this.setState({ isSearching: false });
      return;
    }

    const pokemons = this.state.allPokemons;
    const searchedPokemons = [];
    const query_str = query.toLowerCase();
    pokemons.forEach((pokemon) => {
      const _pokemon = pokemon.name.toLowerCase();
      if (_pokemon.includes(query_str)) {
        searchedPokemons.push(pokemon);
      }
    });
    this.setState({
      isSearching: true,
      searchedPokemons,
    });
    console.log(searchedPokemons);
  }

  render() {
    const { allPokemons, isSearching, searchedPokemons } = this.state;
    return (
      <div className="document">
        <Header
          onQueryStringChange={(query) => this.handleQueryStringChange(query)}
        ></Header>
        <Body pokemons={!isSearching ? allPokemons : searchedPokemons} />
      </div>
    );
  }

  async UNSAFE_componentWillMount() {
    const allPokemons = await this.getPokemons(this.BASE_URL);
    this.setState({ allPokemons });
  }

  async getPokemons(url) {
    let pokemons = [];
    try {
      const json = await getAPIData(url);
      for (let i = 0; i < json.results.length; i++) {
        const result = json.results[i];
        const info = await this.getInfoPokemon(result.url);
        if (info.image != null) pokemons.push(info);
      }
    } catch (error) {
      console.log(error);
    }
    return pokemons;
  }

  async getInfoPokemon(pokemon_url) {
    try {
      const json = await getAPIData(pokemon_url);
      const _id = json.id.toString();
      const id =
        _id.length === 1 ? `00${_id}` : _id.length === 2 ? `0${_id}` : _id;
      let types = json.types.map((type) => capitalizeWord(type.type.name));
      return {
        name: capitalizeWord(json.name),
        image: this.POKE_IMAGES_URL + `${id}.png`,
        id: id,
        types: types.reverse(),
      };
    } catch (error) {
      console.log(error);
    }
  }
}
