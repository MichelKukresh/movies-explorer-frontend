import "./Header.css";
import logo from "../../images/logo.svg";
import icon from "../../images/icon__COLOR_icon-main.svg";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();
  const isAuth = props.type === "auth";
  const isProfile = props.type === "profile";
  const isLandibg = props.type === "landing";

  function handlButtonGetMovies(e) {
    e.preventDefault();
    props.inMovies();
    props.setEditUiMenu("movies");
  }

  function handlButtonGetSaveMovies(e) {
    e.preventDefault();
    props.inSavedMovies();
    props.setEditUiMenu("saved-movies");
  }

  function handlButtonSignIn(e) {
    props.setOpenPopaLodegin(true);
    navigate("/sign-in");
  }

  function handlButtonSignUp(e) {
    props.setOpenPopapRegistration(true);
    navigate("/sign-up");
  }

  function handlButtonAkkaunt() {
    navigate("/profile");
  }

  return (
    <header className={`header ${(isProfile || isAuth) && "header_white"}`}>
      <div
        className={`header__container ${isAuth && "header__container_auth"}`}
      >
        <a className="header__logo-link" href="/movies-explorer-frontend">
          <img className="header__logo" src={logo} alt="логотип" />{" "}
        </a>
        {!isAuth && props.loggedIn && (
          <BurgerMenu setOpen={props.setOpen}></BurgerMenu>
        )}
        {(isProfile || props.loggedIn) && (
          <div className="header__container-profile">
            <div className="header__container-profile-link">
              <button
                type="button"
                onClick={(e) => handlButtonGetMovies(e)}
                className={`header__link ${
                  props.typeEditUiMenu === "movies" && "header__link_activ"
                } ${props.type === "landing" && "header__link_landing"}`}
              >
                Фильмы
              </button>
              <button
                type="button"
                onClick={(e) => handlButtonGetSaveMovies(e)}
                className={`header__link ${
                  props.typeEditUiMenu === "saved-movies" &&
                  "header__link_activ"
                } ${props.type === "landing" && "header__link_landing"}`}
              >
                Сохраненные фильмы
              </button>
            </div>
            <button
              onClick={() => handlButtonAkkaunt()}
              type="button"
              className={`header__buttom-akkaunt ${
                props.type === "landing" && "header__buttom-akkaunt_landing"
              }`}
            >
              <img src={icon} alt="иконка аккаунта" />{" "}
              <span className="header__buttom-akkaunt-title">Аккаунт</span>
            </button>
          </div>
        )}
        {isLandibg && !props.loggedIn && (
          <div className="header__login">
            <button
              type="button"
              className="header__signup"
              onClick={(e) => handlButtonSignUp(e)}
            >
              Регистрация
            </button>

            <button
              type="button"
              className="header__signin"
              onClick={handlButtonSignIn}
            >
              <span>Войти</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
