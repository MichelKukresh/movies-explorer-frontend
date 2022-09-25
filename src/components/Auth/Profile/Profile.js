import { useState } from "react";
import ButtonSubmit from "../../ButtonSubmit/ButtonSubmit";
import "./Profile.css";

function Profile() {
  // отображение элементов на странице
  const [isVisivleEdit, setVisibleElit] = useState(false);
  const [isReadOnly, setReadOnly] = useState(true);

  function handlButtonEdit() {
    setVisibleElit(true);
    setReadOnly(false);
  }

  function handlButtonSubmit() {
    setVisibleElit(false);
    setReadOnly(true);
  }

  // валидация

  return (
    <div className="profile">
      <div className="profile__wrapper-logo">
        <h2 className="profile__hello">Привет, Виталий!</h2>
      </div>
      <form className="profile__form-container" onSubmit={handlButtonSubmit}>
        <span className="profile__span-input">Василий</span>
        <input
          minLength="2"
          maxLength="200"
          readOnly={isReadOnly}
          required
          type="text"
          className="profile__input-type"
          placeholder="Имя"
        ></input>
        <span className="profile__span-input">pochta@yandex.ru</span>
        <input
          minLength="2"
          maxLength="200"
          readOnly={isReadOnly}
          required
          type="text"
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
        {isVisivleEdit && <ButtonSubmit type="submit" title="Сохранить" />}
      </form>
      <div className="profile__wrapper-is-profile">
        {!isVisivleEdit && (
          <button type="button" className="profile__in">
            Выйти из аккаунта
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;
