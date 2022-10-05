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
  if(isTypeSavedMoviesSite) { // определяем как загружать карточки (из за разници api карточки формируются по разному))
    isSaved = true;
    linkImages = props.item.image;


  } else {
    //console.log(props.moviesSaved.movieId);
    //console.log(props.moviesSaved.movieId);

    console.log(props.item.id);
    console.log("^------------------------------------");

    isSaved = props.moviesSaved.find((i) => i.movieId === props.item.id);
      console.log(isSaved);

      // const a = (props.item.id == i.movieId ) ? "!!!  совпадает": " НЕ совпадает";
      // console.log(a);
      // console.log("-------------------------------------");


    //});//
    linkImages = `${MOVE_URL}${props.item.image.url}`;
    // const a = isSaved? isSaved._id : "не найдено";
    //console.log(props.moviesSaved);
    //const pp = props.moviesSaved.find((i) => i.movieId === props.item.id);
    //console.log(pp);
  }

  const moviesSavedButtonImages = isSaved ? save : noSave;


  //onsole.log(`isSaved статус при довавление ${isSaved._id}`);

  const hahdleSavedMoviesButton = () => {
    props.hahdleDeleteAndAddSadedMovies(props);



    // if(isSaved) {
    //   props.hahdleDeleteInSadedMovies(isSaved._id);
    //   console.log("!!!!!!!!!!!!!!Удаление");

    // } else {
    //   console.log("!!!!!!!!!!!!!!!!!!!!Добавление");

    //   props.hahdleAddInSadedMovies({

    //     country: props.item.country,
    //     director: props.item.director,
    //     duration: props.item.duration,
    //     year: props.item.year,
    //     description: props.item.description,
    //     image: linkImages,
    //     trailerLink: props.item.trailerLink,
    //     thumbnail: `${MOVE_URL}${props.item.image.formats.thumbnail.url}`,
    //     nameRU: props.item.nameRU,
    //     nameEN: props.item.nameEN,
    //     movieId: props.item.id,
    //   });

    // }
  }


  // function hahdleSavedMoviesButton(id) {


  // }

  // function hahdleSavedMoviesButton() {

  // }

  //console.log("Итерация");

  //console.log(linkImages);

  return (
    <li className="moviesCard">
      <div className="moviesCard__container-text-button">
        <div className="moviesCard__container-text">
          <h3 className="moviesCard__name">{props.item.nameRU}</h3>
          <h3 className="moviesCard__time">{props.item.duration}</h3>
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
