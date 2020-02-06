import React from 'react';

// css files
import './css/body.css';
import 'bootstrap/dist/css/bootstrap.css';
// js files
import { capitalizeWord, getAPIData } from './js/functions.js';

export default class Body extends React.Component
{
    constructor(props) {
        super(props);
        this.pokemons = [];
        this.state = {
            pokemons: this.pokemons
        }

        this.BASE_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0';
        this.POKE_IMAGES_URL = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/';
    }

    render () {
        return (
            <main>
                <div className="bg-pokemons-cards">
                    {this.state.pokemons}
                </div>
            </main>
        );
    }

    async UNSAFE_componentWillMount() {
        const pokemons = await this.getPokemons(this.BASE_URL);
        this.pokemons = pokemons;
        const html_poke = this.getPokemonList(pokemons);
        this.setState({ pokemons: html_poke });
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
            const id = _id.length === 1 ? `00${_id}` : _id.length === 2 ? `0${_id}` : _id;
            let types = json.types.map(type => type.type.name);
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

    getPokemonList(pokemons) {
        let _pokemons = pokemons.slice(),
            list = [];
        const poke_x_row = 4;
        const limit = Math.ceil(pokemons.length / poke_x_row);
        for (let i = 0; i < limit; i++) {
            let cols = [];
            for (let j = 0; j < poke_x_row; j++) {
                const pokemon = _pokemons[j];
                if (_pokemons.length < poke_x_row && j === poke_x_row) break;
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

function PokemonCard({ pokemon_info}) {
    return (
        <div className="cols col-sm-3">
            <div className="poke_card">
                <div className="image">
                    <img src={pokemon_info.image} alt={pokemon_info.name} /><br/>
                </div>
                <div className="information">
                    <span className="id">N° {pokemon_info.id}</span>
                    <div className="name">{pokemon_info.name}</div>
                    <div className="types">
                        {pokemon_info.types.map(type => 
                            <div className={`type-cont ${type}`} key={type}>{type}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
