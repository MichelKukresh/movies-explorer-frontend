import "./Login.css";
import { Link } from "react-router-dom";

function Login(props) {
  function bittonLogin(e) {
    e.preventDefault();
    props.inProfile();
  }

  return (
    <div className="login">
      <div className="login__wrapper-logo">
        <h2 className="login__hello">Рады видеть!</h2>
      </div>
      <form className="login__form-container">
        <span className="login__span-input">E-mail</span>
        <input
          type="text"
          className="login__input-type"
          placeholder="pochta@yandex.ru"
        ></input>
        <span className="login__span-input login__span-input_validation">
          Валидация
        </span>
        <span className="login__span-input">Пароль</span>
        <input
          type="password"
          className="login__input-type"
          placeholder="11111111"
        ></input>
        <span className="login__span-input login__span-input_validation">
          Валидация
        </span>
        <button type="button"
          onClick={(e) => bittonLogin(e)}
          className="login__submit-button"
        >
          Войти
        </button>
      </form>
      <div className="login__wrapper-is-login">
        <span className="login__is-login">Еще не зарегистрированы?</span>
        <Link to="/sign-up" className="login__in">
          Регистрация
        </Link>
      </div>
    </div>
  );
}

export default Login;
