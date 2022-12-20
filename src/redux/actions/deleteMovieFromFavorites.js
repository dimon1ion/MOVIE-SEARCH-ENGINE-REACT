export default function deleteMovieFromFavorites(id) {
    return {
      type: "DELETE_MOVIE_FROM_FAVORITES",
      payload: { id },
    };
  }
  