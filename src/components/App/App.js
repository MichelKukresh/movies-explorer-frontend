import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Promo from "../Main/Promo/Promo";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="app__container">
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
