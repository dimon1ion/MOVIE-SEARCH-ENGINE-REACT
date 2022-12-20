import React, { Component } from 'react';
import './ListPage.css';

class ListPage extends Component {
    state = {
        movies: [],
        title: "Мой список"
        // movies: [
        //     { title: 'The Godfather', year: 1972, imdbID: 'tt0068646' }
        // ]
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        this.sendRequest();

        // TODO: запрос к сервер на получение списка
        // TODO: запросы к серверу по всем imdbID
    }

    sendRequest = async () => {
        const { id } = this.props.match.params;
        const {title, movies} = await (await fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)).json();

        const newMovies = await Promise.all(movies.map(async (movie) => {
            let {Title, Year, imdbID} = await (await fetch(`http://www.omdbapi.com/?i=${movie}&apikey=11306d30`)).json();
            return {title: Title, year: Year, imdbID}
        })) ?? [];

        this.setState({ movies: newMovies, title});
    }

    render() {
        const { movies, title } = this.state;

        if (movies.length === 0) {
            return <div>loading..</div>
        }
        return (
            <div className="list-page">
                <h1 className="list-page__title">{title}</h1>
                <ul>
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                <a href={`https://www.imdb.com/title/${item.imdbID}/`} target="_blank">{item.title} ({item.year})</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
 
export default ListPage;