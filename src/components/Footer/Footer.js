import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <p>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__info ">
        <p className="footer__copyright">&copy;2022</p>
        <div className="footer__link"><p>Яндекс.Практикум</p> <p className="footer__git">Github</p></div>

      </div>
    </div>
  );
}

export default Footer;
