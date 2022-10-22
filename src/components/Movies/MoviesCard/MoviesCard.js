import "./MoviesCard.css";
import noSave from "../../../images/save9d.svg";
import save from "../../../images/save9.svg";
import del from "../../../images/d9.svg";
import { MOVE_URL } from "../../../utils/initialCards";

function MoviesCard(props) {
  // определяем страницу где будут загружаться карточки (сохраненные или нет)
  const isTypeSavedMoviesSite = props.typeEditUiMenu === "saved-movies";

  let isSaved;
  let linkImages;
  if (isTypeSavedMoviesSite) {
    // определяем как загружать карточки (из за разницы api карточки формируются по разному)
    isSaved = del;
    linkImages = props.item.image;
  } else {
    isSaved = props.moviesSaved.find((i) => i.movieId === props.item.id)
      ? save
      : noSave;
    linkImages = `${MOVE_URL}${props.item.image.url}`;
  }

  const hahdleSavedMoviesButton = () => {
    props.hahdleDeleteAndAddSadedMovies(props);
  };

  const minutes = props.item.duration % 60;
  const hour = Math.floor(props.item.duration / 60);

  return (
    <li className="moviesCard">
      <div className="moviesCard__container-text-button">
        <div className="moviesCard__container-text">
          <h3 className="moviesCard__name">{props.item.nameRU}</h3>
          <h3 className="moviesCard__time">
            {hour ? `${hour}ч ` : ""}
            {minutes ? `${minutes}м` : ""}
          </h3>
        </div>
        <button
          type="button"
          onClick={() => hahdleSavedMoviesButton()}
          className="moviesCard__button"
        >
          <img src={isSaved} alt="сохранена"></img>
        </button>
      </div>
      <a href={props.item.trailerLink} target="blank">
        <img
          className="moviesCard__img"
          src={linkImages}
          alt="картинка фильма"
        ></img>
      </a>
    </li>
  );
}

export default MoviesCard;
