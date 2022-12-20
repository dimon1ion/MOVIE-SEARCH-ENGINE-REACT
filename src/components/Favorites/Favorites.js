import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import deleteMovieFromFavorites from "../../redux/actions/deleteMovieFromFavorites";
import sendMoviesToServer from "../../redux/actions/sendMoviesToServer";
import "./Favorites.css";

class Favorites extends Component {
  state = {
    title: "",
  };

  titleChangeHandler = (e) => {
    this.setState({ title: e.target.value });
  };

  onClickHandler = () => {
    const { movies, onSendMoviesToServer } = this.props;

    const data = {
        "title": this.state.title,
        "movies": [...movies.map(value => value.imdbID)]
    }
    

    fetch("https://acb-api.algoritmika.org/api/movies/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            onSendMoviesToServer(data);
        });
  };

  render() {
    const { title } = this.state;
    const { movies, onDeleteMovieFromFavorites, savedMovies } = this.props;

    return (
      <div className="favorites">
        <input
          value={title}
          className="favorites__name"
          onChange={this.titleChangeHandler}
          placeholder="Новый список"
        />
        <ul className="favorites__list">
          {movies.map((item) => {
            return (
              <li key={item.imdbID}>
                {item.Title} ({item.Year})
                <button
                  type="button"
                  onClick={() => onDeleteMovieFromFavorites(item.imdbID)}
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
        {savedMovies ? 
            <Link to={`/list/${savedMovies.id}`} >Перейти к списку</Link>
        :
            <button
            type="button"
            className="favorites__save"
            disabled={!title || !movies.length}
            onClick={this.onClickHandler}
            >
                Сохранить список
            </button>
        }
      </div>
    );
  }
}

export default connect(
  ({favoriteMovies, savedMovies}) => {
    return { 
        movies: favoriteMovies,
        savedMovies: savedMovies };
  },
  (dispatch) => ({
    onDeleteMovieFromFavorites: (id) => dispatch(deleteMovieFromFavorites(id)),
    onSendMoviesToServer: (data) => dispatch(sendMoviesToServer(data))
  })
)(Favorites);
