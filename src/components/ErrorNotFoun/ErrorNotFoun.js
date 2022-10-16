import "./ErrorNotFoun.css";

function ErrorNotFoun(props) {
  function handleButtonBack() {
    props.setVisibleErrorNotFound(false);
  }

  return (
    <div
      className={`errorNotFoun ${
        props.isVisibleErrorNotFound && "errorNotFoun_activ"
      }`}
    >
      <div className="errorNotFoun__container">
        <h3 className="errorNotFoun__title">404</h3>
        <span className="errorNotFoun__span">Страница не найдена</span>
        <button
          className="errorNotFoun__button-back"
          type="button"
          onClick={() => handleButtonBack()}
        >
          Назад
        </button>
      </div>
    </div>
  );
}

export default ErrorNotFoun;
