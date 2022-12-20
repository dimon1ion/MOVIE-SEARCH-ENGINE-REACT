import React, { Component } from 'react';
import { connect } from 'react-redux';
import searchMovie from '../../redux/actions/searchMovie';
import './SearchBox.css';

class SearchBox extends Component {
    state = {
        searchLine: "",
        isWrite: false
    }
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    }
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        const { onSearchMovie } = this.props;
        this.setState({isWrite: true, searchLine: ""});
        const url = new URLSearchParams();
        url.append("s", this.state.searchLine);
        url.append("apikey", "11306d30");
        fetch(`http://www.omdbapi.com/?${url.toString()}`)
            .then(responce => responce.json())
            .then(data => {
                if (data.Error) {
                    return;
                }
                onSearchMovie(data);
            })
            .finally(() => {
                this.setState({isWrite: false});
            });
    }
    render() {
        const { searchLine, isWrite } = this.state;

        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                            disabled={isWrite}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={isWrite || !searchLine}
                    >
                        Искать
                    </button>
                </form>
            </div>
        );
    }
}
 
export default connect(
    null,
    (dispatch) => ({
        onSearchMovie: (data) => dispatch(searchMovie(data))
    })
)(SearchBox);