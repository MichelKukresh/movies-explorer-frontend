import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "../Auth/Login/Login";
import Profile from "../Auth/Profile/Profile";
import Register from "../Auth/Register/Register";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Menu from "../Menu/Menu";
import Movies from "../Movies/Movies";
import SavedMovies from "../Movies/SavedMovies/SavedMovies";

import "./App.css";

function App() {
  const navigate = useNavigate();
  const [isEditNavigationMenuOpen, setEditNavigationMenuOpen] = useState(false); // Попап регистрации
  const [typeEditUiMenu, setEditUiMenu] = useState("");

  useEffect(() => {
    tokenCheck();
    setEditUiMenu("/main");

  }, []);

  const tokenCheck = () => {
    navigate("/movies-explorer-frontend");
  };

  function inMovies() {
    navigate("/movies");
    setEditNavigationMenuOpen(false);
  }

  function inSavedMovies() {
    navigate("/saved-movies");
    setEditNavigationMenuOpen(false);
  }

  function inProfile() {
    navigate("/profile");
  }

  function inMain() {
    navigate("/movies-explorer-frontend");
    setEditNavigationMenuOpen(false);
  }

  return (
    <div className="app">
      <div className="app__container">
        <Routes>
          <Route
            path="/movies-explorer-frontend"
            element={
              <div>
                <Header type="landing" />
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
            element={
              <>
                <Header
                  setOpen={setEditNavigationMenuOpen}
                  type="profile"
                  inMovies={inMovies}
                  inSavedMovies={inSavedMovies}
                  setEditUiMenu={setEditUiMenu}
                  typeEditUiMenu={typeEditUiMenu}
                ></Header>
                <Profile
                ></Profile>
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                <Header
                  setOpen={setEditNavigationMenuOpen}
                  type="profile"
                  inMovies={inMovies}
                  inSavedMovies={inSavedMovies}
                  setEditUiMenu={setEditUiMenu}
                  typeEditUiMenu={typeEditUiMenu}
                ></Header>
                <Movies></Movies>
                <Footer></Footer>
              </>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <>
                <Header
                  type="profile"
                  setOpen={setEditNavigationMenuOpen}
                  inMovies={inMovies}
                  inSavedMovies={inSavedMovies}
                  setEditUiMenu={setEditUiMenu}
                  typeEditUiMenu={typeEditUiMenu}
                ></Header>
                <SavedMovies></SavedMovies>
              </>
            }
          />
        </Routes>
        <Menu
          isOpen={isEditNavigationMenuOpen}
          inMovies={inMovies}
          inSavedMovies={inSavedMovies}
          setOpen={setEditNavigationMenuOpen}
          inMain={inMain}
          setEditUiMenu={setEditUiMenu}
          typeEditUiMenu={typeEditUiMenu}
        ></Menu>
      </div>
    </div>
  );
}

export default App;
