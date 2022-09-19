import "./BurgerMenu.css";
import burgerXL from "../../../images/burgerXL.svg";
// import burgerL from "../../../images/burgerL.svg";

function BurgerMenu() {
  return (
    <div>
      {/* <div className="urgerMenu__wrapper" >
        <img src={burgerL} alt="картинка бургера" />
      </div> */}
      <div className="urgerMenu__wrapper">
        <img src={burgerXL} alt="картинка бургера" />
      </div>
    </div>
  );
}

export default BurgerMenu;
