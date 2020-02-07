import React from 'react';

export default class Searcher extends React.Component {
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