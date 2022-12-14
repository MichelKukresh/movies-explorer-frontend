import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import "./MoviesCardList.css";

function MoviesCardList(props) {
  const isTypeSavedMoviesSite = props.typeEditUiMenu === "saved-movies";

  const moviesArrForRender = isTypeSavedMoviesSite
    ? props.moviesSaved
    : props.movies;

  function handleButtonNext() {
    props.handleButtonNextMovies();
  }

  return (
    <div className="moviesCardList">
      {!props.isVisiblePreloader && (
        <ul className="moviesCardList__container">
          {moviesArrForRender?.map((movies) => (
            <MoviesCard
              moviesSaved={props.moviesSaved} // в saved-movies массив не передается
              typeEditUiMenu={props.typeEditUiMenu}
              item={movies} // в movies передается пропс props.moviesSaved
              key={Math.random()}
              hahdleDeleteAndAddSadedMovies={
                props.hahdleDeleteAndAddSadedMovies
              }
            ></MoviesCard>
          ))}
        </ul>
      )}
      {props.isVisiblePreloader && <Preloader></Preloader>}
      {props.messageForNotFound}
      {props.dataButtonNext.isVisible && !isTypeSavedMoviesSite && (
        <button
          onClick={() => handleButtonNext()}
          type="button"
          className="moviesCardList__button-next"
        >
          Еще
        </button>
      )}
    </div>
  );
}

export default MoviesCardList;
