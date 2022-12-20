const initialState = {
    movies: [],
    favoriteMovies: [],
    savedMovies: null
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "SEARCH_MOVIE":
            {
                const { Search } = payload;
                return { ...state, movies: [...Search] };
            }
        case "ADD_FAVOURITE_MOVIE":
            {
                const { id } = payload;
                if (state.favoriteMovies.find(item => item.imdbID === id)) {
                    return state;
                }
                return { ...state, favoriteMovies: [...state.favoriteMovies, state.movies.find(item => item.imdbID === id)] };
            }
        case "DELETE_MOVIE_FROM_FAVORITES":
            {
                const { id } = payload;
                return { ...state, favoriteMovies: state.favoriteMovies.filter(item => item.imdbID !== id) };
            }
        case "SEND_MOVIES_TO_SERVER":
            {
                const { data } = payload;
                return { ...state, savedMovies: data };
            }
        default: return state;
    }
}