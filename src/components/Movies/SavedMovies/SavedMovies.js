
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";
//import MoviesCardList from "./MoviesCardList/MoviesCardList";
//import Preloader from "./Preloader/Preloader";
//import SearchForm from "./SearchForm/SearchForm";

function SavedMovies(props) {

  // typeEditUiMenu={typeEditUiMenu}




  return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm
        handleinitialMovies={props.handleinitialMovies}
        ></SearchForm>
        <MoviesCardList
        // hahdleDeleteInSadedMovies={props.hahdleDeleteInSadedMovies}
        // movies={props.movies}
        // hahdleAddInSadedMovies={props.hahdleAddInSadedMovies}
        moviesSaved={props.moviesSaved}
        typeEditUiMenu={props.typeEditUiMenu}
        hahdleDeleteAndAddSadedMovies={props.hahdleDeleteAndAddSadedMovies}
        //keyValue={props.moviesSaved.movieId}
        ></MoviesCardList>
        <Preloader></Preloader>
      </div>
    </section>
  );
}

export default SavedMovies;