import React from 'react';

// css files
import './css/body.css';
import 'bootstrap/dist/css/bootstrap.css';

export default class Body extends React.Component
{
    constructor(props) {
        super(props);
        this.pokemons = [];
        this.state = {
            pokemons: this.pokemons
        }

        this.BASE_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=48&offset=0';
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

    async componentDidMount() {
        const pokemons = await this.getPokemons(this.BASE_URL);
        this.pokemons = pokemons;
        const html_poke = this.getPokemonList(pokemons);
        this.setState({ pokemons: html_poke });
    }

    async getPokemons(url) {
        let pokemons = [];
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(response.statusText);
            const json = await response.json();

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
            const response = await fetch(pokemon_url);
            if (!response.ok) throw new Error(response.statusText);
            const json = await response.json();
            const _id = json.id.toString();
            const id = _id.length === 1 ? `00${_id}` : _id.length === 2 ? `0${_id}` : _id;
            return {
                name: json.name.charAt(0).toUpperCase() + json.name.slice(1),
                image: this.POKE_IMAGES_URL + `${id}.png`,
                id: id,
            };
        } catch (error) {
            console.log(error);
        }
    }

    getPokemonList(pokemons) {
        let _pokemons = pokemons.slice(),
            list = [];
        const limit = parseInt(pokemons.length / 3);
        for (let i = 0; i < limit; i++) {
            let cols = [];
            for (let j = 0; j < 3; j++) {
                if (!_pokemons.length) break;
                const pokemon = _pokemons[j];
                cols.push(
                    <PokemonCard
                        key={pokemon.id}
                        pokemon_info={pokemon} />
                );
            }
            const row = <div key={i} className="row">{cols}</div>
            list.push(row);
            _pokemons = _pokemons.slice(3);
        }
        return list;
    }
}

function PokemonCard({pokemon_info}) {
    return (
        <div className="col-sm-4">
            <div className="image"><img src={pokemon_info.image} alt={pokemon_info.name} /></div>
            <div className="name">{pokemon_info.name}</div>
        </div>
    );
}
