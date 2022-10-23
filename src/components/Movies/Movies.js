import { useEffect } from "react";
import "./Movies.css";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

import SearchForm from "./SearchForm/SearchForm";

function Movies(props) {
  useEffect(() => {
    props.setEditNavigationMenuOpen(false);
    props.changeableArray();
    props.setConfigSearchForm();
    props.setEditUiMenu("movies");
  }, []);

  return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm
          messageInputSearch={props.messageInputSearch}
          typeEditUiMenu={props.typeEditUiMenu}
          toggleCheckbox={props.toggleCheckbox}
          setToggleCheckbox={props.setToggleCheckbox}
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
