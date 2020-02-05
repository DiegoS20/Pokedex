import React from 'react';

// css files
import './css/header.css';

// static files
import pokeball from './media/images/pokeball.png';
import pokedex from './media/images/pokedex_text.png';

export default function Header(props) {
    return (
        <header>
            <div className="logo-name">
                <div className="logo"><img src={pokeball} alt="Pokeball" /></div>
                <div className="name">
                    <img src={pokedex} alt="Pokedex text" />
                </div>
            </div>
            <Searcher></Searcher>
        </header>
    );
}

class Searcher extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
        }
    }

    handleKeyUp(e) {
        //Execute function to search pokemons
    }

    handleKeyDown(e) {
        if (this.timeOut) {
            clearTimeout(this.timeOut);
            delete this.timeOut;
        }
    }

    render() {
        return (
            <div className="searcher">
                <div className="search-input">
                    <input
                        type="text"
                        placeholder="Write your pokemon name!"
                        autoFocus
                        onKeyUp={e => this.handleKeyUp(e)}
                        onKeyDown={e => this.handleKeyDown(e)}
                        onInput={e => {
                            this.setState({ inputText: e.target.value })
                        }} />
                </div>
            </div>
        );
    }   
}
