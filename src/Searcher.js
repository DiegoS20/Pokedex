import React from 'react';

export default class Searcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
        }
    }

    handleKeyUp(e) {
        this.timeOut = setTimeout(() => {
            this.props.onQueryStringChange(this.state.inputText);
            this.clearTimeOut();
        }, 100);
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
                        onKeyDown={() => this.clearTimeOut()}
                        onInput={e => {
                            this.setState({ inputText: e.target.value })
                        }} />
                </div>
            </div>
        );
    }

    clearTimeOut() {
        if (this.timeOut) {
            clearTimeout(this.timeOut);
            delete this.timeOut;
        }
    }
}