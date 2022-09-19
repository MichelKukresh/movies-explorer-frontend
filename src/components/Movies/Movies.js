import "./Movies.css";
import tumb from "../../images/smalltumb.svg";
import tumbOff from "../../images/smalltumboff.svg";
import searchicon from "../../images/searchicon.svg";
import find from "../../images/find.svg";

function Movies() {
  return(
    <section className="movies">
      <div className="movies__container">
      <div className="movies__container-search">
        <img src={searchicon} alt="иконка поиска"/>
        <p>Фильм</p>
        <button><img src={find} alt="кнопка поиска"/></button>


      </div>
      <button><img src={tumb} alt="включено"/></button>
      <button><img src={tumbOff} alt="выключено"/></button>
      </div>
    </section>
  )
}

export default Movies;