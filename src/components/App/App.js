// import { useEffect } from "react";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "../Auth/Login/Login";
import Profile from "../Auth/Profile/Profile";
import Register from "../Auth/Register/Register";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
// import Promo from "../Main/Promo/Promo";

import "./App.css";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    navigate("/sign");
  };

  function inMovies() {
    navigate("/movies");
  }

  function inProfile() {
    navigate("/profile");

  };

  return (
    <div className="app">
      <div className="app__container">
        <Routes>
          <Route
            path="/sign"
            element={
              <div>
                <Header
                type="landing" />
                <Main></Main>
                <Footer></Footer>
              </div>
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <Header type="auth" />
                <Login inProfile={inProfile}></Login>
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <Header type="auth" />
                <Register></Register>
              </>
            }
          />
          <Route
          path="/profile"
          element={<>

          <Header
          type="profile"
          >

          </Header>
          <Profile inMovies={inMovies}></Profile>

          </>}

          />


          <Route path="/movies" element={
            <>
            <Header></Header>
            <Movies></Movies>
            </>

          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
