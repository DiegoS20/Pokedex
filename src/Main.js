import React from 'react';
import Header from './Header.js';
import Body from './Body.js';
import { capitalizeWord, getAPIData } from './js/functions.js';

import './css/main.css';

export default class Main extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            allPokemons: [],
            query: null,
            searchedPokemons: []
        }

        this.BASE_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0';
        this.POKE_IMAGES_URL = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/';
    }

    render() {
        const { allPokemons, query, searchedPokemons } = this.state;
        return (
            <div className="document">
                <Header></Header>
                <Body
                    pokemons={!query ? allPokemons : searchedPokemons} />
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
            const id = _id.length === 1 ? `00${_id}` : _id.length === 2 ? `0${_id}` : _id;
            let types = json.types.map(type => capitalizeWord(type.type.name));
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