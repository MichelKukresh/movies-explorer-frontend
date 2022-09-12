import "./Portfolio.css";
import myPhoto from "../../../images/my4.png";
import arrow from "../../../images/text__COLOR_font-main.png";

function Portfolio() {
  return (
    <div className="portfolio">
      <h2 className="portfolio__title">Студент</h2>
      <div className="portfolio__text-foto">
        <div >
          <h2 className="portfolio__name">Михаил</h2>
          <p className="portfolio__professional">Фронтенд-разработчик, 35 лет</p>
          <p className="portfolio__about">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <p className="portfolio__git">Github</p>
          <p className="portfolio__portfolio">Портфолио</p>
        </div>
        <img className="portfolio__foto" src={myPhoto} alt="мое фото" />
      </div>
      <div>
        <ul className="portfolio__list-link">
          <li className="portfolio__text-link"><a className="portfolio__link" href="URL">Статичный сайт</a><img alt="стрелка" src={arrow}/></li>
          <li className="portfolio__text-link portfolio__text-link_border"><a className="portfolio__link" href="URL">Адаптивный сайт</a><img alt="стрелка" src={arrow}/></li>
          <li className="portfolio__text-link"><a className="portfolio__link" href="URL">Одностраничное приложение</a><img alt="стрелка" src={arrow}/></li>
        </ul>
      </div>
    </div>
  );
}

export default Portfolio;
