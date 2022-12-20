export default function searchMovie(data) {
  return {
    type: "SEARCH_MOVIE",
    payload: data,
  };
}
