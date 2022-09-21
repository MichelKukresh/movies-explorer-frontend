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

  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    navigate("/sign");
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

  return (
    <div className="app">
      <div className="app__container">
        <Routes>
          <Route
            path="/sign"
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
                ></Header>
                <Profile
                  inMovies={inMovies}
                  inSavedMovies={inSavedMovies}
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
        ></Menu>
      </div>
    </div>
  );
}

export default App;
