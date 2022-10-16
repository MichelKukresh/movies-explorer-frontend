import "./Portfolio.css";
import myPhoto from "../../../images/my4.png";
import arrow from "../../../images/text__COLOR_font-main.png";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Студент</h2>
      <div className="portfolio__text-foto">
        <div>
          <h2 className="portfolio__name">Михаил</h2>
          <p className="portfolio__professional">
            Фронтенд-разработчик, 35 лет
          </p>
          <p className="portfolio__about">
            Я родился в Волгограде и на данный момент живу в Химках, закончил
            Ростовский институт РГУПС по специальности инженер связи. У
            меня есть жена и дочь. Я люблю концерты под открытым небом и
            палаточный отдых, а ещё увлекаюсь бегом. Недавно начал кодить.
            С 2006 года работал на железной дороге связистом. После того,
            как прошёл курс по веб-разработке, начал заниматься фриланс-заказами
            и ушёл с постоянной работы.
          </p>
          <p className="portfolio__git">Github</p>
          <p className="portfolio__portfolio">Портфолио</p>
        </div>
        <img className="portfolio__foto" src={myPhoto} alt="мое фото" />
      </div>
      <div>
        <ul className="portfolio__list-link">
          <li className="portfolio__text-link">
            <a
              target="blank"
              className="portfolio__link"
              href="https://michelkukresh.github.io/how-to-learn/index.html"
            >
              Статичный сайт
            <img alt="стрелка" src={arrow} />
            </a>
          </li>
          <li className="portfolio__text-link portfolio__text-link_border">
            <a
              target="blank"
              className="portfolio__link"
              href="https://michelkukresh.github.io/russian-travel/index.html"
            >
              Адаптивный сайт
            <img alt="стрелка" src={arrow} />
            </a>
          </li>
          <li className="portfolio__text-link">
            <a
              target="blank"
              className="portfolio__link"
              href="https://kukreshma.students.nomoredomains.sbs"
              //href="https://michelkukresh.github.io/mesto/index.html"
            >
              Одностраничное приложение
            <img alt="стрелка" src={arrow} />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
