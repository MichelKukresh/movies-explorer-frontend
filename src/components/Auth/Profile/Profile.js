import { useContext, useEffect, useRef, useState } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import useFormWithValidation from "../../../utils/hooks";
import ButtonSubmit from "../../ButtonSubmit/ButtonSubmit";
import "./Profile.css";

function Profile(props) {
  // отображение элементов на странице
  const [isVisivleEdit, setVisibleElit] = useState(false);
  const [isReadOnly, setReadOnly] = useState(true);
  const currentUser = useContext(CurrentUserContext);
  const [isChangDataInput, setChangDataInput  ] = useState(false);

  const form = useFormWithValidation();
  const refName = useRef(null);
  const refEmail = useRef(null);

  useEffect(() => {
    refEmail.current.value = "";
    refName.current.value = "";
    props.setMessageAboutResultUpdateProfile({err: true, messge: ""});
  }, [props.isOpenPopapRegistration]);

  function handlButtonEdit() {
    refEmail.current.value = currentUser.email;
    refName.current.value = currentUser.name;

    setVisibleElit(true);
    setReadOnly(false);
    props.setMessageAboutResultUpdateProfile({err: true, messge: ""});
  }

  function submitEdit(e) {
    setVisibleElit(false);
    setReadOnly(true);
    props.handleUpdateUser({
      email: refEmail.current.value,
      name: refName.current.value,
    });
    refEmail.current.value = "";
    refName.current.value = "";
    props.setMessageAboutResultUpdateProfile({err: true, messge: ""});
  }

  function handleChange(e) {
    form.handleChange(e);
    console.log(refEmail.current.value);
    console.log(currentUser.email);
    console.log(refName.current.value);
    console.log(currentUser.name);

    // блокирует сохранение если данные не изменялись
    const isFormDataDifferentFromCurrent =
    refEmail.current.value === currentUser.email &&
    refName.current.value  === currentUser.name
      ? false
      : true;
    setChangDataInput(isFormDataDifferentFromCurrent);
  }

  return (
    <div className="profile">
      <div className="profile__wrapper-logo">
        <h2 className="profile__hello">Привет, {currentUser.name}!</h2>
      </div>
      <form className="profile__form-container">
        {/* <span className="profile__span-input">{includNameAndMailToSpan.name}</span> */}
        <input
          onChange={(e) => handleChange(e)}
          ref={refName}
          name="name"
          minLength="2"
          maxLength="200"
          readOnly={isReadOnly}
          required
          type="text"
          className="profile__input-type"
          placeholder={currentUser.name}
        ></input>
        {/* <span className="profile__span-input profile__span-input_last">
          {includNameAndMailToSpan.email}
        </span> */}
        <span className="profile__span-input-validation">
          {form.errors.name}
        </span>
        <input
          onChange={(e) => handleChange(e)}
          ref={refEmail}
          name="email"
          readOnly={isReadOnly}
          required
          type="email"
          className="profile__input-type profile__input-type_border-none"
          placeholder={currentUser.email}
        ></input>
        <span className="profile__span-input-validation profile__span-input-validation_long-margin">
          {form.errors.email}<span className={ props.messageAboutResultUpdateProfile.err ? "profile__span-input-validation_no-error" : ""}>{props.messageAboutResultUpdateProfile.messge}</span>
        </span>
        {/* <span className="profile__span-input profile__span-input_validation">Валидация</span> */}
        {!isVisivleEdit && (
          <button
            type="button"
            className="profile__submit-button"
            onClick={() => handlButtonEdit()}
          >
            Редактировать
          </button>
        )}
        {isVisivleEdit && (
          <ButtonSubmit
            isDisableStatus={form.isValid && isChangDataInput}
            onClick={(e) => submitEdit(e)}
            type="submit"
            title="Сохранить"
          />
        )}
      </form>
      <div className="profile__wrapper-is-profile">
        {!isVisivleEdit && (
          <button
            onClick={() => props.handleLogaut()}
            type="button"
            className="profile__in"
          >
            Выйти из аккаунта
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;
