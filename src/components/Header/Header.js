import "./Header.css";
import logo from "../../images/logo.svg";
import icon from "../../images/icon__COLOR_icon-main.svg";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import { Link } from "react-router-dom";

function Header(props) {
  const isAuth = props.type === "auth";
  const isProfile = props.type === "profile";
  const isLandibg = props.type === "landing";

  function handlButtonGetMovies(e) {
    e.preventDefault();
    props.inMovies();
    props.setEditUiMenu("/movies");
  }

  function handlButtonGetSaveMovies(e) {
    e.preventDefault();
    props.inSavedMovies();
    props.setEditUiMenu("/saved-movies");
  }



  return (
    <header className={`header ${(isProfile || isAuth) && "header_white"}`}>
      <div
        className={`header__container ${isAuth && "header__container_auth"}`}
      >
        <a className="header__logo-link" href="/movies-explorer-frontend">
          <img className="header__logo" src={logo} alt="логотип" />{" "}
        </a>
        {!isLandibg && !isAuth && (
          <BurgerMenu setOpen={props.setOpen}></BurgerMenu>
        )}
        {isProfile && (
          <div className="header__container-profile">
            <div className="header__container-profile-link">
              <button
              type="button"
              onClick={(e) => handlButtonGetMovies(e)}
              className={`header__link ${ (props.typeEditUiMenu === "/movies") && "header__link_activ" }`}
              >
                Фильмы
              </button>
              <button type="button" onClick={(e) => handlButtonGetSaveMovies(e)}
              className={`header__link ${ (props.typeEditUiMenu === "/saved-movies") && "header__link_activ" }`}>
                Сохраненные фильмы
              </button>
            </div>
            <button type="button" className="header__buttom-akkaunt">
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
