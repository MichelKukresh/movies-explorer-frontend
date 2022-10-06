import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

function SavedMovies(props) {

  return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm
          handleinitialMovies={props.handleinitialMovies}
        ></SearchForm>
        <MoviesCardList
          moviesSaved={props.moviesSaved}
          typeEditUiMenu={props.typeEditUiMenu}
          hahdleDeleteAndAddSadedMovies={props.hahdleDeleteAndAddSadedMovies}
        ></MoviesCardList>
      </div>
    </section>
  );
}

export default SavedMovies;
