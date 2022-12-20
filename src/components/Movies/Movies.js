import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';

class Movies extends Component {
    state = {}
    render() {
        const { movies } = this.props; 
        return ( 
            <ul className="movies">
                {movies.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}>
                        <MovieItem {...movie} />
                    </li>
                ))}
            </ul>
        );
    }
}
 
export default connect(
    (state) => ( { movies: state.movies } )
)(Movies);