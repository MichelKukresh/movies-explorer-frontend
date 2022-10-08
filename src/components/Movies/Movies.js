import "./Movies.css";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

import SearchForm from "./SearchForm/SearchForm";

function Movies(props) {
  return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm
          handleinitialMovies={props.handleinitialMovies}
          setMessageForNotFound={props.setMessageForNotFound}
        ></SearchForm>
        <MoviesCardList
        dataButtonNext={props.dataButtonNext}
        handleButtonNextMovies={props.handleButtonNextMovies}
          typeEditUiMenu={props.typeEditUiMenu}
          movies={props.movies}
          hahdleDeleteAndAddSadedMovies={props.hahdleDeleteAndAddSadedMovies}
          moviesSaved={props.moviesSaved}
          isVisiblePreloader={props.isVisiblePreloader}
          messageForNotFound={props.messageForNotFound}
        ></MoviesCardList>
      </div>
    </section>
  );
}

export default Movies;
