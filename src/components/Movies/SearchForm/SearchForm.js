import "./SearchForm.css";

import RadioButton from "../RadioButton/RadioButton";
import { useRef, useState } from "react";
import searchicon from "../../../images/searchicon.svg";
import find from "../../../images/find.svg";
import useFormWithValidation from "../../../utils/hooks";

function SearchForm(props) {
  //const [toggleValueInWiev, setToggleValueInWiev] = useState(false);
  //toggleCheckbox={toggleCheckbox}
  //setToggleCheckbox={setToggleCheckbox}
  //console.log(props);

  const isTypeSavedMoviesSite = props.typeEditUiMenu === "saved-movies";
  // const isTypeMoviesSite = props.typeEditUiMenu === "movies";

  const toggleValue = isTypeSavedMoviesSite ? props.toggleCheckbox.plaseSavedMovies : props.toggleCheckbox.placeMovie;

  // if(isTypeSavedMoviesSite) {
  //   setToggleValueInWiev(props.toggleCheckbox.plaseSavedMovies);

  // } else {
  //   setToggleValueInWiev(props.toggleCheckbox.placeMovie);

  // }


  // const moviesArrForRender = isTypeSavedMoviesSite
  //   ? placeMovie;
  //   : plaseSavedMovies;

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

  function handleCheckBox(e) {
    if (isTypeSavedMoviesSite) {
      props.setToggleCheckbox({ plaseSavedMovies: e.target.checked });
    } else {
      props.setToggleCheckbox({ placeMovie: e.target.checked });
    }

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
          onClick={(e) => handleSubmitButton(e)}
          className="searchForm__button-search"
          disabled={!form.isValid}
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
