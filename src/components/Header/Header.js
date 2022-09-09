import './Header.css';
import logo from "../../images/logo.svg";

function Header() {
  return(
    <div className="header__container">
    <img src={logo} alt="логотип"/>
    <a src="">Регистрация</a>
    <button className='header__button'>Войти</button>

    </div>
  )
}

export default Header;