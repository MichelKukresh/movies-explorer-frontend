import "./Header.css";
import logo from "../../images/logo.svg";


function Header() {
  return (
    <div className="header__container">
      <div className="header__menu-logo">
        <img className="header__logo" src={logo} alt="логотип" />
        <div className="header__login">
          <a className="header__sungup" src="">Регистрация</a>
          <button className="header__button">Войти</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
