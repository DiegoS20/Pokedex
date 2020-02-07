import React from 'react';
import PokemonCard from './PokemonCard.js';

import './css/body.css';
import './css/types_colors.css';
import 'bootstrap/dist/css/bootstrap.css';

export default class Body extends React.Component
{
    render () {
        const pokemons = this.getPokemonList(this.props.pokemons);
        return (
            <main>
                <div className="bg-pokemons-cards">
                    {pokemons}
                </div>
            </main>
        );
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
                if (typeof pokemon === 'undefined') break;
                cols.push(
                    <PokemonCard
                        key={pokemon.id}
                        pokemon_info={pokemon} />
                );
            }
            const row = <div key={i} className="row">{cols}</div>
            list.push(row);
            _pokemons = _pokemons.slice(poke_x_row);
        }
        return list;
    }
}
