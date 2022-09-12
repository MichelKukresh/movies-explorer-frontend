import AboutProject from "./AboutProject/AboutProject";
import Promo from "./Promo/Promo";
import "./Main.css";
import Techs from "./Techs/Techs";
import Portfolio from "./Portfolio/Portfolio";

function Main() {
  return(
    <div className="main">
      <Promo></Promo>
      <AboutProject></AboutProject>
      <Techs></Techs>
      <Portfolio></Portfolio>
    </div>

  )
}

export default Main;
