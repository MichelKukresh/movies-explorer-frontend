import { useNavigate } from "react-router-dom";
import "./ErrorNotFoun.css";

function ErrorNotFoun(props) {
  const navigate = useNavigate();
  console.log(props.badRoute);
  function handleButtonBack() {
    props.setVisibleErrorNotFound(false);
    if(props.badRoute) {
      navigate("/movies-explorer-frontend");
    }
  }

  return (
    <div
      className={`errorNotFoun ${
        (props.isVisibleErrorNotFound || props.badRoute) && "errorNotFoun_activ"
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
