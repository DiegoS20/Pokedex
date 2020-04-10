import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard.jsx";

import "../css/body.css";
import "../css/types_colors.css";
import "bootstrap/dist/css/bootstrap.css";

import poke_icon from "../media/images/pokeball_icon.png";

function Body(props) {
  /* states */
  const [pokemonsLoaded, setPokemonsLoaded] = useState(false);

  // global variables
  const pokemons = getPokemonList(props.pokemons);

  useEffect(() => {
    if (!pokemonsLoaded && pokemons.length > 0) {
      setPokemonsLoaded(true);
      document.getElementsByTagName("body")[0].style.overflowY = "scroll";
    }
  });

  function getPokemonList(pokemons) {
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
        <div key={i} className="row">
          {cols}
        </div>
      );
      list.push(row);
      _pokemons = _pokemons.slice(poke_x_row);
    }
    return list;
  }

  return (
    <main>
      {!pokemonsLoaded && (
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
export default Body;

// export default class Body extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       pokemonsLoaded: false,
//     };
//   }

//   render() {
//     const pokemons = this.getPokemonList(this.props.pokemons);
//     return (
//       <main>
//         {!this.state.pokemonsLoaded && (
//           <div className="loading-pokemons">
//             <div className="message">
//               <div className="pokeball-icon">
//                 <img src={poke_icon} alt="Pokeball loading icon" />
//               </div>
//               <div className="text">Loading pokemons...</div>
//             </div>
//           </div>
//         )}
//         <div className="bg-pokemons-cards">{pokemons}</div>
//       </main>
//     );
//   }
// }
