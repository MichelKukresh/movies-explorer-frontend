import "./BurgerMenu.css";
import burgerXL from "../../../images/burgerXL.svg";
import burgerL from "../../../images/burgerL.svg";

function BurgerMenu(props) {
  return (
    <>
      <button type="button" className="burgerMenu" onClick={(e) => props.setOpen(true)}>
        <div className="burgerMenu__wrapper burgerMenu__wrapper_l">
          <img src={burgerL} alt="картинка бургера" />
        </div>
        <div className="burgerMenu__wrapper burgerMenu__wrapper_Xl">
          <img src={burgerXL} alt="картинка бургера" />
        </div>
      </button>
    </>
  );
}

export default BurgerMenu;
