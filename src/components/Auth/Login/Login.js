import "./Login.css";
import { Link } from "react-router-dom";
import useFormWithValidation from "../../../utils/hooks";
import ButtonSubmit from "../../ButtonSubmit/ButtonSubmit";
import { useEffect, useRef } from "react";

function Login(props) {
  // function bittonLogin(e) {
  //   e.preventDefault();
  //   props.inProfile();
  // }

  const form = useFormWithValidation();
  const refPassword = useRef(null);
  const refEmail = useRef(null);

  useEffect(() => {
    refEmail.current.value = "";
    refPassword.current.value = "";
  }, [props.isOpenPopapRegistration]);


  function hahdleSubmitForm(e) {
    form.resetForm();
    submitLogin(e);
  }

  function submitLogin(e) {
    // e.preventDefault();
    props.hahdleSubmitLogin({
      email: refEmail.current.value,
      password: refPassword.current.value,
    });
  }




  return (
    <div className="login">
      <div className="login__wrapper-logo">
        <h2 className="login__hello">Рады видеть!</h2>
      </div>
      <form className="login__form-container">
        <span className="login__span-input">E-mail</span>

        <input
        onChange={(e) => form.handleChange(e)}
        name="email"
        ref={refEmail}
          type="text"
          className="login__input-type"
          placeholder="pochta@yandex.ru"
          required
        ></input>
        <span className="login__span-input login__span-input_validation">
        {form.errors.email}
        </span>

        <span className="login__span-input">Пароль</span>
        <input
        onChange={(e) => form.handleChange(e)}
        name="password"
          ref={refPassword}
          type="password"
          className="login__input-type"
          placeholder="11111111"
          required
        ></input>
        <span className="login__span-input login__span-input_validation">
        {form.errors.password}
          {props.errorMessage &&
            !form.isVisibleSpanError &&
            "Что то пошло не так ..."}
        </span>

        <ButtonSubmit
          isDisableStatus={form.isValid}
          onClick={(e) => hahdleSubmitForm(e)}
          type="submit"
          title="Войти"
        ></ButtonSubmit>
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
