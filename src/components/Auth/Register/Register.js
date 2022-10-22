import "./Register.css";
import { Link } from "react-router-dom";
import useFormWithValidation from "../../../utils/hooks";
import ButtonSubmit from "../../ButtonSubmit/ButtonSubmit";
import { useEffect, useRef } from "react";

function Register(props) {
  const form = useFormWithValidation();
  const refName = useRef(null);
  const refPassword = useRef(null);
  const refEmail = useRef(null);

  useEffect(() => {
    refName.current.value = "";
    refEmail.current.value = "";
    refPassword.current.value = "";
  }, [props.isOpenPopapRegistration]);

  function hahdleSubmitForm(e) {
    form.resetForm();
    submitRegister(e);
  }

  function submitRegister(e) {
    props.hahdleSubmitRegister({
      name: refName.current.value,
      email: refEmail.current.value,
      password: refPassword.current.value,
    });
  }

  return (
    <div className="register">
      <div className="register__wrapper-logo">
        <h2 className="register__hello">Добро пожаловать!</h2>
      </div>
      <form className="register__form-container" autoComplete="off">
        <span className="register__span-input">Имя </span>
        <input
          ref={refName}
          onChange={(e) => form.handleChange(e)}
          name="name"
          type="text"
          className="register__input-type"
          placeholder="Василий"
          required
          maxLength={30}
          minLength={2}
        ></input>
        <span className="register__span-input register__span-input_validation">
          {form.errors.name}
        </span>

        <span className="register__span-input">E-mail</span>
        <input
          ref={refEmail}
          onChange={(e) => form.handleChange(e)}
          name="email"
          type="email"
          className="register__input-type"
          placeholder="pochta@yandex.ru"
          required
        ></input>
        <span className="register__span-input register__span-input_validation">
          {form.errors.email}
        </span>
        <span className="register__span-input">Пароль</span>

        <input
          ref={refPassword}
          onChange={(e) => form.handleChange(e)}
          name="password"
          type="password"
          className="register__input-type"
          placeholder="*******"
          required
        ></input>
        <span className="register__span-input register__span-input_validation register__span-input_plase-on-button">
          {form.errors.password}
          {props.errorMessage &&
            !form.isVisibleSpanError &&
            "Что то пошло не так ..."}
        </span>

        <ButtonSubmit
          isDisableStatus={form.isValid}
          onClick={(e) => hahdleSubmitForm(e)}
          type="submit"
          title="Зарегистрироваться"
        ></ButtonSubmit>
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
