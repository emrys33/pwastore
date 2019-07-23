import React, { Component } from 'react';

import './Search.css';

class Search extends Component {
    state = {
        searchParams: ''
    }

    searchInputHandler = (event) => {
        this.setState({searchParams: event.target.value});
    }

    searchClickedHandler = (searchParams) => {
        if (this.state.searchParams.length >= 3) {
            this.props.searched(searchParams);
        }
    }

    render () {
        return (
            <div className="Search-wraper">
                <input
                onChange={(event) => this.searchInputHandler(event)}
                className="Search-input"
                    type="text" 
                    placeholder="Search" 
                    aria-label="Search"
                />
                <button
                    onClick={()=>this.searchClickedHandler(this.state.searchParams)} 
                    className="Search-button">
                        <i className="fa fa-search"></i>
                </button>
            </div>
        );
    }
}

export default Search;