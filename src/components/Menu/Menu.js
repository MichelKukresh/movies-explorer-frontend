import "./Menu.css";
import icon from "../../images/icon__COLOR_icon-main.png";

function Menu(props) {
  function handlButtonToMovies(e) {
    e.preventDefault();
    props.inMovies();
  }

  function handlButtonToSavedMovies(e) {
    e.preventDefault();
    props.inSavedMovies();
  }

  return (
    <div className={`menu ${props.isOpen && "menu_is-open"}`}>
      <div className="menu__content">
        {/* <img src={close}></img> */}
        <button
          className="menu__close"
          onClick={() => props.setOpen(false)}
        ></button>
        <button className="menu__navigation">Главная</button>
        <button
          className="menu__navigation"
          onClick={(e) => handlButtonToMovies(e)}
        >
          Фильмы
        </button>
        <button
          className="menu__navigation"
          onClick={(e) => handlButtonToSavedMovies(e)}
        >
          Сохраненные фильмы
        </button>
        <button className="menu__buttom-akkaunt">
          <img src={icon} alt="иконка аккаунта" />{" "}
          <span className="menu__buttom-akkaunt-title">Аккаунт</span>
        </button>
      </div>
    </div>
  );
}

export default Menu;
