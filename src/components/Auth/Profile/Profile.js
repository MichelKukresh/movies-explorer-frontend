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

  const form = useFormWithValidation();
  const refName = useRef(null);
  const refEmail = useRef(null);

  useEffect(() => {
    refEmail.current.value = "";
    refName.current.value = "";
  }, [props.isOpenPopapRegistration]);

  function handlButtonEdit() {
    setVisibleElit(true);
    setReadOnly(false);
  }

  // function handlButtonSubmit() {
  //   setVisibleElit(false);
  //   setReadOnly(true);
  //   submitEdit();
  // }


  function submitEdit(e) {
    console.log({
        email: refEmail.current.value,
        name: refName.current.value,
      });

    // e.preventDefault();
    setVisibleElit(false);
    setReadOnly(true);
    props.handleUpdateUser({
      email: refEmail.current.value,
      name: refName.current.value,
    });
  }




  // валидация

  return (
    <div className="profile">
      <div className="profile__wrapper-logo">
        <h2 className="profile__hello">Привет, {currentUser.name}!</h2>
      </div>
      <form className="profile__form-container" >
        <span className="profile__span-input">{currentUser.name}</span>
        <input
        onChange={(e) => form.handleChange(e)}
        ref={refName}
        name="name"
          minLength="2"
          maxLength="200"
          readOnly={isReadOnly}
          required
          type="text"
          className="profile__input-type"
          placeholder="Имя"
        ></input>
        <span className="profile__span-input">{currentUser.email}</span>
        <input
        onChange={(e) => form.handleChange(e)}
          ref={refEmail}
          name="email"
          readOnly={isReadOnly}
          required
          type="email"
          className="profile__input-type profile__input-type_border-none"
          placeholder="E-mail"
        ></input>
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
        {isVisivleEdit && <ButtonSubmit  isDisableStatus={form.isValid} onClick={(e)=>submitEdit(e)} type="submit" title="Сохранить" />}
      </form>
      <div className="profile__wrapper-is-profile">
        {!isVisivleEdit && (
          <button onClick={()=> props.handleLogaut()}  type="button" className="profile__in">
            Выйти из аккаунта
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;
