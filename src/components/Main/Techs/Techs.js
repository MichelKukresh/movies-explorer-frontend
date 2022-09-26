import "./Techs.css";

function Techs() {
  return (
    <section className="techs">
      <div className="techs__wrapper">
        <h2 className="techs__title">Технологии</h2>
        <div className="techs__text">
          <h2 className="techs__text-subtitle">7 технологий</h2>
          <p className="techs__text-paragraph">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
          <ul className="techs__lists-techs">
            <li className="techs__tech">
              <p className="techs__name">HTML</p>
            </li>
            <li className="techs__tech">
              <p className="techs__name">CSS</p>
            </li>
            <li className="techs__tech">
              <p className="techs__name">JS</p>
            </li>
            <li className="techs__tech">
              <p className="techs__name">React</p>
            </li>
            <li className="techs__tech">
              <p className="techs__name">Git</p>
            </li>
            <li className="techs__tech">
              <p className="techs__name">Express.js</p>
            </li>
            <li className="techs__tech">
              <p className="techs__name">mongoDB</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Techs;
