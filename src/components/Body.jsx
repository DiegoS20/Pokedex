import React from "react";
import PokemonCard from "./PokemonCard.jsx";

import "../css/body.css";
import "../css/types_colors.css";
import "bootstrap/dist/css/bootstrap.css";

import poke_icon from "../media/images/pokeball_icon.png";

export default class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonsLoaded: false,
    };
  }

  render() {
    const pokemons = this.getPokemonList(this.props.pokemons);
    return (
      <main>
        {!this.state.pokemonsLoaded && (
          <div className="loading-pokemons">
            <div className="message">
              <div className="pokeball-icon">
                <img src={poke_icon} alt="Pokeball loading icon" />
              </div>
              <div className="text">Loading pokemons...</div>
            </div>
          </div>
        )}
        <div className="bg-pokemons-cards">{pokemons}</div>
      </main>
    );
  }

  componentDidUpdate() {
    const pokemonsLoaded = this.state.pokemonsLoaded;
    if (!pokemonsLoaded) {
      this.setState({ pokemonsLoaded: true });
      document.getElementsByTagName("body")[0].style.overflowY = "scroll";
    }
  }

  getPokemonList(pokemons) {
    let _pokemons = pokemons.slice(),
      list = [];
    const poke_x_row = 4;
    const limit = Math.ceil(pokemons.length / poke_x_row);
    for (let i = 0; i < limit; i++) {
      let cols = [];
      for (let j = 0; j < poke_x_row; j++) {
        const pokemon = _pokemons[j];
        if (typeof pokemon === "undefined") break;
        cols.push(<PokemonCard key={pokemon.id} pokemon_info={pokemon} />);
      }
      const row = (
        // Grapping the X pokemon card into a bootstrap row
        <div key={i} className="row">
          {cols}
        </div>
      );
      list.push(row);
      _pokemons = _pokemons.slice(poke_x_row);
    }
    return list;
  }
}
