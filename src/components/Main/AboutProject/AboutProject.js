import "./AboutProject.css";

function AboutProject() {
  return(
    <section className="aboutProject">
      <h2 className="aboutProject__title"> О проекте</h2>

      <div className="aboutProject__more">
        <p className="aboutProject__sub-title aboutProject__sub-title_a">Дипломный проект включал 5 этапов</p>
        <p className="aboutProject__sub-title aboutProject__sub-title_c aboutProject__sub-title_mobile">На выполнение диплома ушло 5 недель</p>
        <h3 className="aboutProject__info aboutProject__info_b">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</h3>
        <h3 className="aboutProject__info aboutProject__info_d">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</h3>
      </div>

      <div className="aboutProject__calendar">
        <div className="aboutProject__calendar-week aboutProject__calendar-week_blue"><p className="aboutProject__calendar-text">1 неделя</p></div>
        <div className="aboutProject__calendar-week"><p className="aboutProject__calendar-text">4 недели</p></div>
        <div className="aboutProject__calendar-fronnt-beck"><p className="aboutProject__calendar-text">Back-end</p></div>
        <div className="aboutProject__calendar-fronnt-beck"><p className="aboutProject__calendar-text">Front-end</p></div>

      </div>
    </section>
  )
}

export default AboutProject;