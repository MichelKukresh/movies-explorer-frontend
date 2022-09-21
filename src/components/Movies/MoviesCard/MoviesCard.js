import "./MoviesCard.css";
import cardImg from "../../../images/MoviesCard.png";
// import noSave from "../../../images/save9d.png";
import save from "../../../images/save9.png";

function MoviesCard() {
  return (

  <li className="moviesCard">
      <div className="moviesCard__container-text-button">
        <div className="moviesCard__container-text">
          <h3 className="moviesCard__name">33 слова о дизайне</h3>
          <h3 className="moviesCard__time"> 1ч 47мин</h3>
        </div>
        <button className="moviesCard__button"><img src={save} alt="сохранена"></img></button>
      </div>
      <img className="moviesCard__img" src={cardImg} alt="картинка фильма"></img>
    </li>
  );
}

export default MoviesCard;
