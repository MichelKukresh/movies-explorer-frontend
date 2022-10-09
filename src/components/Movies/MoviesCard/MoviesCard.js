import "./MoviesCard.css";
/// import cardImg from "../../../images/MoviesCard.png";
import noSave from "../../../images/save9d.svg";
import save from "../../../images/save9.svg";
import { MOVE_URL } from "../../../utils/initialCards";

function MoviesCard(props) {
  // определяем страницу где будут загружаться карточки (сохраненные или нет)
  const isTypeSavedMoviesSite = props.typeEditUiMenu === "saved-movies";
  // const isTypeMoviesSite = props.typeEditUiMenu === "movies";

  let isSaved;
  let linkImages;
  if (isTypeSavedMoviesSite) {
    // определяем как загружать карточки (из за разници api карточки формируются по разному))
    isSaved = true;
    linkImages = props.item.image;
  } else {
    isSaved = props.moviesSaved.find((i) => i.movieId === props.item.id);
    linkImages = `${MOVE_URL}${props.item.image.url}`;
  }

  const moviesSavedButtonImages = isSaved ? save : noSave;
  const hahdleSavedMoviesButton = () => {
    props.hahdleDeleteAndAddSadedMovies(props);
  };

  const minutes = (props.item.duration % 60);
  const hour = (Math.floor(props.item.duration / 60));

  return (
    <li className="moviesCard">
      <div className="moviesCard__container-text-button">
        <div className="moviesCard__container-text">
          <h3 className="moviesCard__name">{props.item.nameRU}</h3>
          <h3 className="moviesCard__time">{hour ? `${hour}ч `: "" }{minutes ? `${minutes}м`: ""}</h3>
        </div>
        <button
          type="button"
          onClick={() => hahdleSavedMoviesButton()}
          className="moviesCard__button"
        >
          <img src={moviesSavedButtonImages} alt="сохранена"></img>
        </button>
      </div>
      <img
        className="moviesCard__img"
        src={linkImages}
        alt="картинка фильма"
      ></img>
    </li>
  );
}

export default MoviesCard;
