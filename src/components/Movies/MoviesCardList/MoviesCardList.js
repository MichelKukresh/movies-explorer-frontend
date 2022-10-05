import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList(props) {

  console.log(props.moviesSaved);

  // // определяем страницу где будут загружаться карточки (сохраненные или нет)
  // switch (props.typeEditUiMenu) {
  //   case 'saved-movies':
  //     console.log('')
  //     break
  //   case 'movies':
  //     console.log('')
  //     break
  //   default:
  //     console.log('Тип страници не задан')
  //     break
  // }


// определяем страницу где будут загружаться карточки (сохраненные или нет)
const isTypeSavedMoviesSite = props.typeEditUiMenu === "saved-movies";
// const isTypeMoviesSite = props.typeEditUiMenu === "movies";

const moviesArrForRender = isTypeSavedMoviesSite ?  props.moviesSaved : props.movies;

//const keyValue = isTypeSavedMoviesSite ? moviesArrForRender._id : moviesArrForRender.id;

//console.log(moviesArrForRender);

  return (
    <>
      <ul className="moviesCardList">
        {moviesArrForRender?.map((movies) => (<MoviesCard
        //hahdleAddInSadedMovies={props.hahdleAddInSadedMovies}
        moviesSaved={props.moviesSaved} // в saved-movies массив не передается
        typeEditUiMenu={props.typeEditUiMenu}
        item={movies} // в movies передается пропс props.moviesSaved
        //key={props.keyValue}
        key={Math.random()}
       // hahdleDeleteInSadedMovies={props.hahdleDeleteInSadedMovies}
       hahdleDeleteAndAddSadedMovies={props.hahdleDeleteAndAddSadedMovies}
        ></MoviesCard>))}
      </ul>
      <button type="button" className="moviesCardList__button-next">Еще</button>
    </>
  );
}

export default MoviesCardList;
