import "./SearchForm.css";

import RadioButton from "../RadioButton/RadioButton";
import { useRef, useState } from "react";
import searchicon from "../../../images/searchicon.svg";
import find from "../../../images/find.svg";

function SearchForm() {
  const [toggle, setToggle] = useState(false);

  const searchInput = useRef(null);

  function handleFocus() {
    searchInput.current.focus();
  }

  return (
    <>
      <div className="searchForm__container-search">
        <button className="searchForm__button-search">
          <img src={searchicon} alt="иконка поиска" onClick={handleFocus} />
        </button>
        <input
          className="searchForm__input-search"
          placeholder="Фильмы"
          ref={searchInput}
        />
        <button className="searchForm__button-search">
          <img src={find} alt="кнопка поиска" onClick={handleFocus} />
        </button>
      </div>
      <div className="searchForm__wrapper-changle-text">
        <RadioButton
          onChange={(e) => setToggle(e.target.checked)}
        ></RadioButton>
        <span>Короткометражки</span>
      </div>
    </>
  );
}

export default SearchForm;