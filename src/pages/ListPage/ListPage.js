import React, { Component } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ListPage.css';

function ListPage() {
    const params = useParams();
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState("Мой список");

    useEffect(() => {
        sendRequest();
    }, [])

    const sendRequest = async () => {
        const { id } = params;
        const {title, movies} = await (await fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)).json();

        const newMovies = await Promise.all(movies.map(async (movie) => {
            let {Title, Year, imdbID} = await (await fetch(`http://www.omdbapi.com/?i=${movie}&apikey=11306d30`)).json();
            return {title: Title, year: Year, imdbID}
        })) ?? [];
        setMovies(newMovies);
        setTitle(title);
    }

        if (movies.length === 0) {
            return <div>loading..</div>
        }
        return (
            <div className="list-page">
                <h1 className="list-page__title">{title}</h1>
                <ul>
                    {movies.map((item) => {
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
 
export default ListPage;