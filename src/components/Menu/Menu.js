import "./Menu.css";
import icon from "../../images/icon__COLOR_icon-main.svg";
import { useNavigate } from "react-router-dom";

function Menu(props) {

  const navigate = useNavigate();

  function handlButtonToMovies(e) {
    e.preventDefault();
    props.inMovies();
    props.setEditUiMenu("movies");
  }

  function handlButtonToSavedMovies(e) {
    e.preventDefault();
    props.inSavedMovies();
    props.setEditUiMenu("saved-movies");
  }

  function handlButtonToMaini(e) {
    e.preventDefault();
    props.inMain();
    props.setEditUiMenu("movies-explorer-frontend");
  }

  function handlButtonAkkaunt() {
    navigate("/profile");
    props.setEditNavigationMenuOpen(false);
  }

  return (
    <div className={`menu ${props.isOpen && "menu_is-open"}`}>
      <div className="menu__content">
        {/* <img src={close}></img> */}
        <button
          type="button"
          className="menu__close"
          onClick={() => props.setOpen(false)}
        ></button>
        <button
          onClick={(e) => handlButtonToMaini(e)}
          type="button"
          className={`menu__navigation ${
            props.typeEditUiMenu === "movies-explorer-frontend" &&
            "menu__navigation_activ"
          }`}
        >
          Главная
        </button>
        <button
          type="button"
          className={`menu__navigation ${
            props.typeEditUiMenu === "movies" && "menu__navigation_activ"
          }`}
          onClick={(e) => handlButtonToMovies(e)}
        >
          Фильмы
        </button>
        <button
          type="button"
          className={`menu__navigation ${
            props.typeEditUiMenu === "saved-movies" && "menu__navigation_activ"
          }`}
          onClick={(e) => handlButtonToSavedMovies(e)}
        >
          Сохраненные фильмы
        </button>
        <button type="button" className="menu__buttom-akkaunt" onClick={()=> handlButtonAkkaunt()}>
          <img src={icon} alt="иконка аккаунта" />{" "}
          <span className="menu__buttom-akkaunt-title">Аккаунт</span>
        </button>
      </div>
    </div>
  );
}

export default Menu;
