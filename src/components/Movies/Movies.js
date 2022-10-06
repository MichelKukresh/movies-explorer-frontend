import "./Movies.css";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";
import SearchForm from "./SearchForm/SearchForm";

function Movies(props) {

  // typeEditUiMenu={typeEditUiMenu}


  return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm
        handleinitialMovies={props.handleinitialMovies}
        ></SearchForm>

          { !props.isVisiblePreloader && <MoviesCardList
          // hahdleDeleteInSadedMovies={props.hahdleDeleteInSadedMovies}
          typeEditUiMenu={props.typeEditUiMenu}
          movies={props.movies}
          // hahdleAddInSadedMovies={props.hahdleAddInSadedMovies}
          hahdleDeleteAndAddSadedMovies={props.hahdleDeleteAndAddSadedMovies}
          moviesSaved={props.moviesSaved}
          //keyValue={props.moviesSaved.id}
          ></MoviesCardList> }

        { props.isVisiblePreloader && <Preloader></Preloader>}

      </div>
    </section>
  );
}

export default Movies;
