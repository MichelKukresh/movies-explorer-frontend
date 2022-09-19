import "./Header.css";
import logo from "../../images/logo.svg";
import icon from "../../images/icon__COLOR_icon-main.png";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import { Link } from "react-router-dom";

function Header(props) {
  const isAuth = props.type === "auth";
  const isProfile = props.type === "profile";
  const isLandibg = props.type === "landing";

  return (
    <header className={`header ${(isProfile || isAuth) && "header_white"}`}>
      <div
        className={`header__container ${isAuth && "header__container_auth"}`}
      >
        <a className="header__logo-link" href="/sing">
          <img className="header__logo" src={logo} alt="логотип" />{" "}
        </a>

        {isProfile && (
          <div className="header__container-profile">
            {/* <BurgerMenu></BurgerMenu> */}
            <div className="header__container-profile-link"><Link to="/movies" className="header__link">Фильмы</Link>
            <Link className="header__link">Сохраненные фильмы</Link></div>

            <button className="header__buttom-akkaunt">
              <img src={icon} alt="иконка аккаунта" />{" "}
              <span className="header__buttom-akkaunt-title">Аккаунт</span>
            </button>
          </div>
        )}

        {isLandibg && (
          <div className="header__login">
            <Link to="/sign-up" className="header__signup" src="">
              Регистрация
            </Link>
            <Link to="/sign-in" className="header__signin">
              <span>Войти</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
