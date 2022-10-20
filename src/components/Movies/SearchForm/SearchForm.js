import "./SearchForm.css";

import RadioButton from "../RadioButton/RadioButton";
import { useEffect, useRef, useState } from "react";
import searchicon from "../../../images/searchicon.svg";
import find from "../../../images/find.svg";
import useFormWithValidation from "../../../utils/hooks";

function SearchForm(props) {



  const searchInput = useRef(null);
  const [
    isCheckValidityOnDataFromLocalStorage,
    setCheckValidityOnDataFromLocalStorage,
  ] = useState(true);

  useEffect(() => {
    console.log(props.typeEditUiMenu);
      if(isTypeSavedMoviesSite) {
      searchInput.current.value = "";
    } else {
      searchInput.current.value = localStorage.getItem("search");
    }
    setCheckValidityOnDataFromLocalStorage(searchInput.current.validity.valid);

  }, []);



  const isTypeSavedMoviesSite = props.typeEditUiMenu === "saved-movies";

  const toggleValue = isTypeSavedMoviesSite
    ? props.toggleCheckbox.plaseSavedMovies
    : props.toggleCheckbox.placeMovie;



    // if(isTypeSavedMoviesSite) {
    //   searchInput.current.value = "";



    // } else {
    //   //console.log(`вот информация вставить ${localStorage.getItem("search")}`);
    //   //searchInput.current.value = localStorage.getItem("search");

    //   searchInput.current.value = localStorage.getItem("search");

    // }


  const form = useFormWithValidation();

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
    setCheckValidityOnDataFromLocalStorage(false);
    //setCheckValidityOnDataFromLocalStorage(!form.isValid);
  }

  function handleCheckBox(e) {
    if (isTypeSavedMoviesSite) {
      props.setToggleCheckbox({ plaseSavedMovies: e.target.checked });
    } else {
      props.setToggleCheckbox({ placeMovie: e.target.checked });
    }
  }
  const isDisabledButtonSubmit = isCheckValidityOnDataFromLocalStorage
    ? isCheckValidityOnDataFromLocalStorage
    : form.isValid;

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
          onClick={(e) => handleSubmitButton(e)}
          className="searchForm__button-search"
          disabled={!isDisabledButtonSubmit}
        >
          <img src={find} alt="кнопка поиска" onClick={handleFocus} />
        </button>
      </form>
      <div className="searchForm__wrapper-changle-text">
        <RadioButton
          toggle={toggleValue}
          onChange={(e) => handleCheckBox(e)}
        ></RadioButton>
        <span>Короткометражки</span>
      </div>
    </>
  );
}

export default SearchForm;
