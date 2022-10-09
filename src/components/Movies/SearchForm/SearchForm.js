import "./SearchForm.css";

import RadioButton from "../RadioButton/RadioButton";
import { useRef, useState } from "react";
import searchicon from "../../../images/searchicon.svg";
import find from "../../../images/find.svg";
import useFormWithValidation from "../../../utils/hooks";

function SearchForm(props) {
  //const [toggle, setToggle] = useState(false);
  //toggleCheckbox={toggleCheckbox}
  //setToggleCheckbox={setToggleCheckbox}

  const form = useFormWithValidation();

  const searchInput = useRef(null);

  function handleFocus() {
    searchInput.current.focus();
  }

  function handleSubmitButton(e) {
    e.preventDefault();
    props.handleinitialMovies(searchInput.current.value);

  }

  function resetMessageForNotFound(e) {
    form.handleChange(e);
    props.setMessageForNotFound("");
  }

  return (
    <>
      <form className="searchForm__container-search">
        <button type="button" className="searchForm__button-search">
          <img src={searchicon} alt="иконка поиска" onClick={handleFocus} />
        </button>
        <input
          className="searchForm__input-search"
          placeholder="Фильмы"
          ref={searchInput}
          required
          onChange={(e) => resetMessageForNotFound(e)}
        />
        <button
        type="submit"
        onClick={(e)=> handleSubmitButton(e)}
        className="searchForm__button-search"
        disabled={!form.isValid}
        >
          <img src={find} alt="кнопка поиска" onClick={handleFocus} />
        </button>
      </form>
      <div className="searchForm__wrapper-changle-text">
        <RadioButton
        toggle={props.toggleCheckbox}
          onChange={(e) => props.setToggleCheckbox(e.target.checked)}
        ></RadioButton>
        <span>Короткометражки</span>
      </div>
    </>
  );
}

export default SearchForm;
