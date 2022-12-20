export default function addFavouriteMovie(id) {
    return {
      type: "ADD_FAVOURITE_MOVIE",
      payload: { id },
    };
  }
  