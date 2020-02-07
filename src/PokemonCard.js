import React from 'react';

export default function PokemonCard({ pokemon_info }) {
    return (
        <div className="cols col-sm-3">
            <div className="poke_card">
                <div className="image">
                    <img src={pokemon_info.image} alt={pokemon_info.name} /><br />
                </div>
                <div className="information">
                    <span className="id">N° {pokemon_info.id}</span>
                    <div className="name">{pokemon_info.name}</div>
                    <div className="types">
                        {pokemon_info.types.map(type =>
                            <div
                                className={`type-cont ${type.toLowerCase()}`}
                                key={type} >{type}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}