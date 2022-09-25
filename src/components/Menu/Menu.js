import "./Menu.css";
import icon from "../../images/icon__COLOR_icon-main.svg";

function Menu(props) {
  function handlButtonToMovies(e) {
    e.preventDefault();
    props.inMovies();
    props.setEditUiMenu("/movies");
  }

  function handlButtonToSavedMovies(e) {
    e.preventDefault();
    props.inSavedMovies();
    props.setEditUiMenu("/saved-movies");
  }

  function handlButtonToMaini(e) {
    e.preventDefault();
    props.inMain();
    props.setEditUiMenu("/main");
  }

  return (
    <div className={`menu ${props.isOpen && "menu_is-open"}`}>
      <div className="menu__content">
        {/* <img src={close}></img> */}
        <button type="button"
          className="menu__close"
          onClick={() => props.setOpen(false)}
        ></button>
        <button
          onClick={(e)=> handlButtonToMaini(e)}
          type="button"
          className={`menu__navigation ${(props.typeEditUiMenu === "/main") && "menu__navigation_activ"}`}
          >Главная</button>
        <button type="button"
          className={`menu__navigation ${(props.typeEditUiMenu === "/movies") && "menu__navigation_activ"}`}
          onClick={(e) => handlButtonToMovies(e)}
        >
          Фильмы
        </button>
        <button type="button"
          className={`menu__navigation ${(props.typeEditUiMenu === "/saved-movies") && "menu__navigation_activ"}`}
          onClick={(e) => handlButtonToSavedMovies(e)}
        >
          Сохраненные фильмы
        </button>
        <button type="button" className="menu__buttom-akkaunt">
          <img src={icon} alt="иконка аккаунта" />{" "}
          <span className="menu__buttom-akkaunt-title">Аккаунт</span>
        </button>
      </div>
    </div>
  );
}

export default Menu;
