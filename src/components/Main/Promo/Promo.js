import textWorld from "../../../images/text__COLOR_landing-logo.svg";
import "./Promo.css";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__wrapper">
        <div className="promo__text">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <span className="promo__span">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </span>
        </div>
        <img className="promo__world" src={textWorld} alt="word" />
      </div>
    </section>
  );
}

export default Promo;
