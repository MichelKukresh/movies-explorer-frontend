import "./Profile.css";

function Profile() {
  return(
    <div className="profile">
      <div className="profile__wrapper-logo">
      <h2 className="profile__hello">Привет, Виталий!</h2>
      </div>
      <form className="profile__form-container">
        <span className="profile__span-input">Василий</span>
        <input type="text" className="profile__input-type" placeholder="Имя"></input>
        <span className="profile__span-input profile__span-input_validation">Валидация</span>
        <span className="profile__span-input">pochta@yandex.ru</span>
        <input type="text" className="profile__input-type" placeholder="E-mail"></input>
        <span className="profile__span-input profile__span-input_validation">Валидация</span>
        <button className="profile__submit-button">Редактировать</button>
      </form>
      <div className="profile__wrapper-is-profile">
          <button className="profile__in">Выйти из аккаунта</button>
        </div>
    </div>

  )
}

export default Profile;