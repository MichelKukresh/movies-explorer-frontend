import "./Register.css";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="register">
      <div className="register__wrapper-logo">
        <h2 className="register__hello">Добро пожаловать!</h2>
      </div>
      <form className="register__form-container">
        <span className="register__span-input">Имя</span>
        <input
          type="text"
          className="register__input-type"
          placeholder="Василий"
        ></input>
        <span className="register__span-input register__span-input_validation">
          Валидация
        </span>
        <span className="register__span-input">E-mail</span>
        <input
          type="text"
          className="register__input-type"
          placeholder="pochta@yandex.ru"
        ></input>
        <span className="register__span-input register__span-input_validation">
          Валидация
        </span>
        <span className="register__span-input">Пароль</span>
        <input
          type="password"
          className="register__input-type"
          placeholder="11111111"
        ></input>
        <span className="register__span-input register__span-input_validation">
          Валидация
        </span>
        <button type="button" className="register__submit-button">Зарегистрироваться</button>
      </form>
      <div className="register__wrapper-is-register">
        <span className="register__is-register">Уже зарегистрированы?</span>
        <Link to="/sign-in" className="register__in">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
