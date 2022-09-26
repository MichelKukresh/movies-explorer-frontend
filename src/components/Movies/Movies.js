import "./Movies.css";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";
import SearchForm from "./SearchForm/SearchForm";

function Movies() {
  return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm></SearchForm>
        <MoviesCardList></MoviesCardList>
        <Preloader></Preloader>
      </div>
    </section>
  );
}

export default Movies;
