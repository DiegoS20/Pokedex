import React from 'react';
import Searcher from './Searcher.js';

import './css/header.css';

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
