import { useEffect } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

function SavedMovies(props) {

  useEffect(()=> {
    props.setEditNavigationMenuOpen(false);
    //props.setMoviesSavedData(props.movies);
    //props.setMessageInputSearch("");
    props.setToggleCheckbox({plaseSavedMovies: false});
        props.setEditUiMenu("saved-movies");
    //props.inSavedMovies();

      }, [])

      //console.log(props.movies);



  //   setMoviesSavedData(moviesSaved);
  //   setMessageInputSearch("");
  //   setToggleCheckbox({plaseSavedMovies: false});


  return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm
         messageInputSearch={props.messageInputSearch}
        typeEditUiMenu={props.typeEditUiMenu}
        toggleCheckbox={props.toggleCheckbox}
        setToggleCheckbox={props.setToggleCheckbox}
        setMessageForNotFound={props.setMessageForNotFound}
          handleinitialMovies={props.handleinitialMovies}
        ></SearchForm>
        <MoviesCardList
        messageForNotFound={props.messageForNotFound}
        dataButtonNext={props.dataButtonNext}
          moviesSaved={props.moviesSaved}
          typeEditUiMenu={props.typeEditUiMenu}
          hahdleDeleteAndAddSadedMovies={props.hahdleDeleteAndAddSadedMovies}
        ></MoviesCardList>
      </div>
    </section>
  );
}

export default SavedMovies;
