import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getJWT, login, register } from "../../utils/Fetch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import Login from "../Auth/Login/Login";
import Profile from "../Auth/Profile/Profile";
import ProtectedRoute from "../Auth/ProtectedRoute/ProtectedRoute";
import Register from "../Auth/Register/Register";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Menu from "../Menu/Menu";
import Movies from "../Movies/Movies";
import SavedMovies from "../Movies/SavedMovies/SavedMovies";

import "./App.css";
import { api } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";
import { MOVE_URL } from "../../utils/initialCards";

function App() {
  const navigate = useNavigate();
  const [isEditNavigationMenuOpen, setEditNavigationMenuOpen] = useState(false); // Попап регистрации
  const [typeEditUiMenu, setEditUiMenu] = useState("");
  const [currentUser, setCurrentUser] = useState({ name: "", about: "" }); //о пользователе => провайдер
  const [errorMessage, setErrorMesage] = useState("");
  //Проверка залогинился ли ранее пользователь
  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpenPopapRegistration, setOpenPopapRegistration] = useState(false);
  const [isOpenPopapLodegin, setOpenPopaLodegin] = useState(false);
  const [movies, setMovies] = useState([]);
  const [moviesSaved, setMoviesSaved] = useState([]);
  // const [moviesOllOnApi, setMoviesOllOnApi] = useState([]);
  const [isVisiblePreloader, setVisiblePreloader] = useState(false);

  //хранение данных при регистрации
  const [userDaraRegister, setUserDaraRegister] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    tokenCheck();
    setEditUiMenu("/main");
  }, []);

  // useEffect(()=> {

  //   if(moviesOllOnApi) {
  //     setMovies([moviesOllOnApi, ...movies]);
  //   }
  // }, [moviesSaved])

  useEffect(() => {
    api.getTwtForNewApi(localStorage.getItem("jwt"));
    if (loggedIn) {
      api.getTwtForNewApi(localStorage.getItem("jwt"));
      Promise.all([
        api.getInitialUser().then((data) => {
          setCurrentUser(data);
        }),

        api
          .getInitialMovies()
          .then((data) => setMoviesSaved(data.data))
          .then((data) => console.log(moviesSaved)),
        // api.getInitialCards().then((data) => {
        //   setCards(
        //     data.data.map((item) => ({
        //       name: item.name,
        //       link: item.link,
        //       likes: item.likes, //массив из лайкнувших
        //       owner: item.owner, //для проверки кто создал карточку\вешать корзину?
        //       _id: item._id, //id самой карточки
        //     }))
        //   );
        // }),
      ]).catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  // const tokenCheck = () => {
  //   navigate("/movies-explorer-frontend");
  // };

  const tokenCheck = () => {
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      getJWT(jwt)
        // .then((data) => {
        // устанавливаем данные о пользователе при логировании
        // setUserDaraRegister({
        //   email: data.email,
        //   password: "",
        // });
        // })
        .then(() => {
          setLoggedIn(true);
          navigate("/movies-explorer-frontend");
        });
    } else {
      navigate("/movies-explorer-frontend");
    }
  };

  function inMovies() {
    navigate("/movies");
    setEditNavigationMenuOpen(false);
  }

  function inSavedMovies() {
    navigate("/saved-movies");
    setEditNavigationMenuOpen(false);
  }

  // function inProfile() {
  //   navigate("/profile");
  // }

  function inMain() {
    navigate("/movies-explorer-frontend");
    setEditNavigationMenuOpen(false);
  }

  //принимаем данные из вормы регистрации
  const hahdleSubmitRegister = (dataRegister) => {
    setErrorMesage("");
    register(dataRegister)
      .then((data) => {
        hahdleSubmitLogin(dataRegister);

        // setSuccessfulRegistration(true);
        // setEditRegisterPopupPopupOpen(true);
        // navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setErrorMesage(err);
        // setSuccessfulRegistration(false);
        // setEditRegisterPopupPopupOpen(true);
      });
  };

  //обработка логина
  const hahdleSubmitLogin = (dataRegister) => {
    // e.preventDefault();

    login(dataRegister)
      .then((data) => {
        if (data.token) {
          setUserDaraRegister(dataRegister);
          setLoggedIn(true);
          navigate("/movies");
          localStorage.setItem("jwt", data.token);
        }
      })
      .catch((err) => {
        console.log(err);
        //setSuccessfulRegistration(false);
        //setEditRegisterPopupPopupOpen(true);
      });
  };

  //выход
  const handleLogaut = () => {
    localStorage.removeItem("jwt");
    setUserDaraRegister({
      email: "",
      password: "",
    });
    setLoggedIn(false);
    navigate("/movies-explorer-frontend");
  };

  function handleUpdateUser({ name, email }) {
    // setButtonInfomationAboutSave("Сохранение...");
    api
      .patchUserInfoNameAbout(name, email)
      .then((data) => {
        setCurrentUser(data);
        // closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
    // .finally(() => setButtonInfomationAboutSave("Сохранить"));
  }

  function handleinitialMovies(search) {
    setVisiblePreloader(true);
    // setButtonInfomationAboutSave("Сохранение...");
    moviesApi
      .getInitialMovies()
      .then((data) => {
        // console.log(search);
        // console.log(data);
        // closeAllPopups();
        const re = new RegExp(`${search}`, "i");
        const foundMoviesID = data
          .map((e) => String(Object.values(e)).match(re) != null && e)
          .filter((e) => e !== false);
        // setMoviesOllOnApi(foundMoviesID);
        return foundMoviesID;

        // console.log(foundMoviesID);
      })
      .then((data) => {
        setMovies(data.map((item) => item));
        setVisiblePreloader(false);
      })

      .catch((err) => {
        console.log(err);
      })
    .finally(() => setVisiblePreloader(false));
  }

  // добавление фильма в сохраненные
  function hahdleAddInSadedMovies(item) {
    console.log(item);
    console.log(movies);
    api
      .savededMovies(item)
      .then((newItem) => {
        setMoviesSaved((moviesSaved) => [newItem.data, ...moviesSaved]);
        const nm = {
          country: newItem.data.country,
          description: newItem.data.description,
          director: newItem.data.director,
          duration: newItem.data.duration,
          id: newItem.data.movieId,
          image: {
            url: newItem.data.image.slice(28),
            formats: { thumbnail: { url: newItem.data.thumbnail.slice(28) } },
          },
          nameEN: newItem.data.nameEN,
          nameRU: newItem.data.nameRU,
          trailerLink: newItem.data.trailerLink,

          // thumbnail: `${MOVE_URL}${data.item.image.formats.thumbnail.url}`,
          year: newItem.data.year,
        };

        //console.log(newItem);

        return nm;
      })
      .then((nm) => {
        setMovies((movies) =>
          movies.map((c) => (c.id === item.movieId ? nm : c))
        );
      });
  }

  // .then((newCard) => {
  //   setCards((cards) =>
  //     cards.map((c) => (c._id === card._id ? newCard.data : c))
  //   );
  // })

  // удаление из сохраненных
  function hahdleDeleteInSadedMovies(id) {
    api.deleteMovie(id).then((newItem) => {
      setMoviesSaved((moviesSaved) =>
        moviesSaved.filter((c) => (c._id !== newItem.data._id ? c : null))
      );
    });
  }

  // принятие решения удалить или сохранить и сформировать объект

  function hahdleDeleteAndAddSadedMovies(data) {
    console.log(data.item);

    switch (data.typeEditUiMenu) {
      case "movies":
        const isSaved = data.moviesSaved.find(
          (i) => i.movieId === data.item.id
        );
        if (isSaved) {
          hahdleDeleteInSadedMovies(isSaved._id);
        } else {
          hahdleAddInSadedMovies({
            country: data.item.country,
            director: data.item.director,
            duration: data.item.duration,
            year: data.item.year,
            description: data.item.description,
            image: `${MOVE_URL}${data.item.image.url}`,
            trailerLink: data.item.trailerLink,
            thumbnail: `${MOVE_URL}${data.item.image.formats.thumbnail.url}`,
            nameRU: data.item.nameRU,
            nameEN: data.item.nameEN,
            movieId: data.item.id,
          });
        }

        break;
      case "saved-movies":
        hahdleDeleteInSadedMovies(data.item._id);
        break;
      default:
        console.log("Тип не определен");
        break;
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="app__container">
          <Routes>
            <Route
              path="/movies-explorer-frontend"
              element={
                <div>
                  <Header
                    inMovies={inMovies}
                    inSavedMovies={inSavedMovies}
                    setOpenPopapRegistration={setOpenPopapRegistration}
                    setOpenPopaLodegin={setOpenPopaLodegin}
                    loggedIn={loggedIn}
                    setEditUiMenu={setEditUiMenu}
                    type="landing"
                    setOpen={setEditNavigationMenuOpen}
                  />
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
                  <Login
                    // inProfile={inProfile}
                    hahdleSubmitLogin={hahdleSubmitLogin}
                  ></Login>
                </>
              }
            />

            <Route
              path="/sign-up"
              element={
                <>
                  <Header
                    type="auth"
                    setOpenPopapRegistration={setOpenPopapRegistration}
                  />
                  <Register
                    errorMessage={errorMessage}
                    isOpenPopapRegistration={isOpenPopapRegistration}
                    setOpenPopapRegistration={setOpenPopapRegistration}
                    hahdleSubmitRegister={hahdleSubmitRegister}
                  ></Register>
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute path="/profile" loggedIn={loggedIn}>
                  <>
                    <Header
                      setOpen={setEditNavigationMenuOpen}
                      type="profile"
                      inMovies={inMovies}
                      inSavedMovies={inSavedMovies}
                      setEditUiMenu={setEditUiMenu}
                      typeEditUiMenu={typeEditUiMenu}
                      loggedIn={loggedIn}
                    ></Header>
                    <Profile
                      handleUpdateUser={handleUpdateUser}
                      handleLogaut={handleLogaut}
                    ></Profile>
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute path="/movies" loggedIn={loggedIn}>
                  <>
                    <Header
                      setOpen={setEditNavigationMenuOpen}
                      type="profile"
                      inMovies={inMovies}
                      inSavedMovies={inSavedMovies}
                      setEditUiMenu={setEditUiMenu}
                      typeEditUiMenu={typeEditUiMenu}
                      loggedIn={loggedIn}
                    ></Header>
                    <Movies
                      isVisiblePreloader={isVisiblePreloader}
                      movies={movies}
                      handleinitialMovies={handleinitialMovies}
                      //hahdleAddInSadedMovies={hahdleAddInSadedMovies}
                      moviesSaved={moviesSaved}
                      typeEditUiMenu={typeEditUiMenu}
                      //hahdleDeleteInSadedMovies={hahdleDeleteInSadedMovies}
                      hahdleDeleteAndAddSadedMovies={
                        hahdleDeleteAndAddSadedMovies
                      }
                    ></Movies>
                    <Footer></Footer>
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
                  <>
                    <Header
                      type="profile"
                      setOpen={setEditNavigationMenuOpen}
                      inMovies={inMovies}
                      inSavedMovies={inSavedMovies}
                      setEditUiMenu={setEditUiMenu}
                      typeEditUiMenu={typeEditUiMenu}
                      loggedIn={loggedIn}
                    ></Header>
                    <SavedMovies
                      //hahdleDeleteInSadedMovies={hahdleDeleteInSadedMovies}
                      hahdleDeleteAndAddSadedMovies={
                        hahdleDeleteAndAddSadedMovies
                      }
                      handleinitialMovies={handleinitialMovies}
                      moviesSaved={moviesSaved}
                      typeEditUiMenu={typeEditUiMenu}
                    ></SavedMovies>
                  </>
                </ProtectedRoute>
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
    </CurrentUserContext.Provider>
  );
}

export default App;
