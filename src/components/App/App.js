import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useParams, useLocation } from "react-router-dom";
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
import ScreenSize from "../../utils/hooksScreenSize";
import ErrorNotFoun from "../ErrorNotFoun/ErrorNotFoun";
import ProtectedRouteLoginAndRegister from "../Auth/ProtectedRouteLoginAndRegister/ProtectedRouteLoginAndRegister";

function App() {
  const navigate = useNavigate();
  //const params = useParams();
  const location = useLocation();
  const [isEditNavigationMenuOpen, setEditNavigationMenuOpen] = useState(false); // Попап регистрации
  const [typeEditUiMenu, setEditUiMenu] = useState("");
  const [currentUser, setCurrentUser] = useState({ name: "", about: "" }); //о пользователе => провайдер
  const [errorMessage, setErrorMesage] = useState("");
  //Проверка залогинился ли ранее пользователь
  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpenPopapRegistration, setOpenPopapRegistration] = useState(false);
  const [isOpenPopapLodegin, setOpenPopaLodegin] = useState(false);
  const [movies, setMovies] = useState([]);
  const [moviesSavedData, setMoviesSavedData] = useState([]); // для отрисовки данных на странице, в том числе и для манипуляций с поиском
  const [moviesSaved, setMoviesSaved] = useState([]); // для хранения данных сохраненных с сервера

  const [isVisiblePreloader, setVisiblePreloader] = useState(false);
  const [messageForNotFound, setMessageForNotFound] = useState("");
  const [messageInputSearch, setMessageInputSearch] = useState(""); // для отображения сообщений в поле поиска "Фильмы"
  const [messageAboutResultUpdateProfile, setMessageAboutResultUpdateProfile] = useState({err: false, messge: ""});


  const [isVisibleErrorNotFound, setVisibleErrorNotFound] = useState(false);

  // модуль отображения количесва фильмов в зависимости от разрешения
  const [columnAndRow, srtColumnAndRow] = useState({
    column: 0,
    row: 0,
    card: 0,
  });
  const [
    changeableArrayDependingScreenSize,
    setChangeableArrayDependingScreenSize,
  ] = useState([]); // массив карточек который идет на отрисовку в зависимости от экрана
  const [dataButtonNext, setDataButtonNext] = useState({
    isVisible: false,
    howMuchAddmovies: 0,
  });

  const [toggleCheckbox, setToggleCheckbox] = useState({
    placeMovie: false,
    plaseSavedMovies: false,
  });

  //хранение данных при регистрации
  const [userDaraRegister, setUserDaraRegister] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    tokenCheck();
    setEditUiMenu(location.pathname.slice(1)); // помогаеь корректно настроить активную страницу(подчеркивание), + заполнение форм при ручном вводе url
  }, []);

  // нестандартное решение для страницы url saved-movies, но сокращает код, минуя все первоначальную обработку страницы url movies
  useEffect(()=> {
    setMoviesSavedData(moviesSaved);
  }, [moviesSaved])

  useEffect(() => {
    api.getTwtForNewApi(localStorage.getItem("jwt"));
    if (loggedIn) {
      api.getTwtForNewApi(localStorage.getItem("jwt"));
      Promise.all([
        api.getInitialUser().then((data) => {
          setCurrentUser(data);
        }),
        api.getInitialMovies().then((data) =>  setMoviesSaved(data.data)),
      ]).then(navigate(location.pathname))
    //.then(console.log("2")) /// вместо
      .catch((err) => {
        setVisibleErrorNotFound(true);
        console.log(err);
      });
    }
  }, [loggedIn]);

  const tokenCheck = () => {
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      getJWT(jwt).then((data) => {
        setLoggedIn(true);


        //setMoviesSavedData(moviesSaved)


        if(location.pathname === "/") {
          navigate("/movies-explorer-frontend");


        } else {
          navigate(location.pathname);
        }

       //navigate(location.pathname);
      })
      .catch((err) => {
        console.log(err);
        navigate("/movies-explorer-frontend");
        // localStorage.removeItem("foundMovies");
        // localStorage.removeItem("toggleCheckbox");
        // localStorage.removeItem("search");
        // localStorage.removeItem("jwt");
        // localStorage.removeItem("beatfilmMoviesOllMuvies");
        localStorage.clear();
        //// добавить очистку списка фильмов с beatifui
        setLoggedIn(false);
      });
    } else {
      navigate(location.pathname);
    }
  };

  function inMovies() {
    navigate("/movies");
    // setEditNavigationMenuOpen(false);
    //changeableArray();
    //setConfigSearchForm();
  }

  function inSavedMovies() {
    navigate("/saved-movies");
    // setEditNavigationMenuOpen(false);
    // //setMoviesSavedData(moviesSaved);
    // setMessageInputSearch("");
    // setToggleCheckbox({plaseSavedMovies: false});


  }


  function inMain() {
    navigate("/movies-explorer-frontend");
    //setEditNavigationMenuOpen(false);
  }

  //принимаем данные из вормы регистрации
  const hahdleSubmitRegister = (dataRegister) => {
    setErrorMesage("");
    register(dataRegister)
      .then((data) => {
        hahdleSubmitLogin(dataRegister);
      })
      .catch((err) => {
        console.log(err);
        setErrorMesage(err);
      });
  };

  //обработка логина
  const hahdleSubmitLogin = (dataRegister) => {
    setErrorMesage("");

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
        setErrorMesage(err);
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
    localStorage.clear();
    // localStorage.removeItem("foundMovies");
    // localStorage.removeItem("toggleCheckbox");
    // localStorage.removeItem("search");
    // localStorage.removeItem("beatfilmMoviesOllMuvies");
  };

  function handleUpdateUser({ name, email }) {
    api
      .patchUserInfoNameAbout(name, email)
      .then((data) => {
        setCurrentUser(data);
        setMessageAboutResultUpdateProfile({err: true, messge: "Данные успешно сохранены"});
      })
      .catch((err) => {
        if(err === "Ошибка: 409") {
          setMessageAboutResultUpdateProfile({err: false, messge: "Данные введены не корректно"});
        } else {
          setVisibleErrorNotFound(true);
        }
        console.log(err);
      });
    // .finally(() => setButtonInfomationAboutSave("Сохранить"));
  }

  // поиск среди фильмов по запросу со страницы movies

  function handleinitialMovies(search) {
    setMessageForNotFound("");
    setVisiblePreloader(true);



    //реализован модуль единичного запроса к серверу фильмов, повторно данные берутся в локал сторидже
    const beatfilmMoviesOllMuvies = JSON.parse(localStorage.getItem("beatfilmMoviesOllMuvies"));

    const result = new Promise((resolve, reject) => {
      if(beatfilmMoviesOllMuvies) {
        resolve( beatfilmMoviesOllMuvies);
      } else {
        moviesApi.getInitialMovies().then((data)=> {
          localStorage.setItem("beatfilmMoviesOllMuvies", JSON.stringify(data));
          reject(data);
        });
      }
    });

      result.then((data) => {
        const re = new RegExp(`${search}`, "i");
        const foundMoviesID = data
          .map((e) => String(Object.values(e)).match(re) != null && e)
          .filter((e) => e !== false);
          console.log(toggleCheckbox.placeMovie);

        const folterShortMovie = !toggleCheckbox.placeMovie
          ? foundMoviesID
          : foundMoviesID.filter((e) => e.duration <= 40);

        // setMoviesOllOnApi(foundMoviesID);
        const checkMessageForNotFound =
          foundMoviesID.length === 0 ? "Ничего не найдено" : "";
        setMessageForNotFound(checkMessageForNotFound);

        // console.log(foundMoviesID);

        // console.log(search);

        localStorage.setItem("foundMovies", JSON.stringify(folterShortMovie));
        localStorage.setItem("toggleCheckbox", toggleCheckbox.placeMovie);
        localStorage.setItem("search", search);
        return folterShortMovie;
      })
      .then((data) => {
        setMovies(data.map((item) => item));
        setVisiblePreloader(false);
        changeableArray();
      })

      .catch((err) => {
        setMessageForNotFound(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
        );
        console.log(err);
      })
      .finally(() => setVisiblePreloader(false));
  }

  // поиск среди сохраненных фильмов
  function handleinitialMoviesInSavedMovies(searchInSavedMovies) {
    const re = new RegExp(`${searchInSavedMovies}`, "i");
    const foundMoviesID = moviesSaved
      .map((e) => String(Object.values(e)).match(re) != null && e)
      .filter((e) => e !== false);

    const folterShortMovie = !toggleCheckbox.plaseSavedMovies
      ? foundMoviesID
      : foundMoviesID.filter((e) => e.duration <= 40);

    setMoviesSavedData(folterShortMovie);

    const checkMessageForNotFound =
      foundMoviesID.length === 0 ? "Ничего не найдено" : "";
    setMessageForNotFound(checkMessageForNotFound);
  }

  // добавление фильма в сохраненные
  function hahdleAddInSadedMovies(item) {
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

          year: newItem.data.year,
        };

        return nm;
      })
      .then((nm) => {
        setChangeableArrayDependingScreenSize(
          (changeableArrayDependingScreenSize) =>
            changeableArrayDependingScreenSize.map((c) =>
              c.id === item.movieId ? nm : c
            )
        );
      })
      .catch((err) => {
        setVisibleErrorNotFound(true);
        console.log(err);
      });
  }

  // удаление из сохраненных
  function hahdleDeleteInSadedMovies(id) {
    api
      .deleteMovie(id)
      .then((newItem) => {
        setMoviesSaved((moviesSaved) =>
          moviesSaved.filter((c) => (c._id !== newItem.data._id ? c : null))
        );

        setMoviesSavedData((moviesSavedData) =>
          moviesSavedData.filter((c) => (c._id !== newItem.data._id ? c : null))
        );
      })
      .catch((err) => {
        setVisibleErrorNotFound(true);
        console.log(err);
      });
  }

  // принятие решения удалить или сохранить и сформировать объект

  function hahdleDeleteAndAddSadedMovies(data) {
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
        //console.log("Тип не определен");
        break;
    }
  }

  const size = ScreenSize();
  const middleWithScrin = 1272;
  const minWithScrin = 480;

  useEffect(() => {
    if (size.With < minWithScrin) {
      srtColumnAndRow({ column: 1, row: 5, card: 5, add: 2 });
    } else if (size.With < middleWithScrin) {
      srtColumnAndRow({ column: 2, row: 8, card: 16, add: 2 });
    } else {
      srtColumnAndRow({ column: 3, row: 3, card: 12, add: 3 });
    }

    changeableArray();
  }, [size.With, movies]);

  // шинкует массив ( сколько было отрисовано по экрану? сколько нужно открывать при нажатии на еще?)
  function changeableArray() {
    const foundMoviesLocalStorage = JSON.parse(
      localStorage.getItem("foundMovies")
    );

    if (foundMoviesLocalStorage) {
      const changeableArrayFromRender = foundMoviesLocalStorage.slice(
        0,
        columnAndRow.card
      );
      setChangeableArrayDependingScreenSize(changeableArrayFromRender);



      const isVisibleNext =
        changeableArrayFromRender.length >= foundMoviesLocalStorage.length
          ? false
          : true;

      setDataButtonNext({ isVisible: isVisibleNext });
    }
  }

  // устанавливаем конфиг в форму поиска
  function setConfigSearchForm() {
    const toggleCheckboxLocalStorage = JSON.parse(
      localStorage.getItem("toggleCheckbox")
    );

    //const searchLocalStorage = localStorage.getItem("search");

    setToggleCheckbox({ placeMovie: toggleCheckboxLocalStorage });

    //setMessageInputSearch(searchLocalStorage);

    console.log("sdsdsd"); ///
  }

  function handleButtonNextMovies() {
    const foundMoviesLocalStorage = JSON.parse(
      localStorage.getItem("foundMovies")
    );

    setChangeableArrayDependingScreenSize(
      foundMoviesLocalStorage.slice(
        0,
        changeableArrayDependingScreenSize.length + columnAndRow.add
      )
    );

    const isVisibleNext =
      changeableArrayDependingScreenSize.length + columnAndRow.add >=
      foundMoviesLocalStorage.length
        ? false
        : true;
    setDataButtonNext({ isVisible: isVisibleNext });
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
                  <Main
                  setEditNavigationMenuOpen={setEditNavigationMenuOpen}

                  ></Main>
                  <Footer></Footer>
                </div>
              }
            />
            <Route
              path="/sign-in"
              element={
                <ProtectedRouteLoginAndRegister path="/sign-in" loggedIn={loggedIn}>
                <>
                  <Header type="auth" />
                  <Login
                    hahdleSubmitLogin={hahdleSubmitLogin}
                    errorMessage={errorMessage}
                  ></Login>
                </>
                </ProtectedRouteLoginAndRegister>
              }
            />

            <Route
              path="/sign-up"
              element={
                <ProtectedRouteLoginAndRegister path="/sign-up" loggedIn={loggedIn}>
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
                </ProtectedRouteLoginAndRegister>
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
                      messageAboutResultUpdateProfile={messageAboutResultUpdateProfile}
                      handleUpdateUser={handleUpdateUser}
                      handleLogaut={handleLogaut}
                      setMessageAboutResultUpdateProfile={setMessageAboutResultUpdateProfile}
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
                    setEditNavigationMenuOpen={setEditNavigationMenuOpen}
                    changeableArray={changeableArray}
                    setConfigSearchForm={setConfigSearchForm}
                    setEditUiMenu={setEditUiMenu}


                      messageInputSearch={messageInputSearch}
                      toggleCheckbox={toggleCheckbox}
                      setToggleCheckbox={setToggleCheckbox}
                      dataButtonNext={dataButtonNext}
                      handleButtonNextMovies={handleButtonNextMovies}
                      setMessageForNotFound={setMessageForNotFound}
                      messageForNotFound={messageForNotFound}
                      isVisiblePreloader={isVisiblePreloader}
                      movies={changeableArrayDependingScreenSize}
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
                    setEditNavigationMenuOpen={setEditNavigationMenuOpen}
                    //setMoviesSavedData={setMoviesSavedData}
                    //setMessageInputSearch={setMessageInputSearch}
                    // setToggleCheckbox({plaseSavedMovies: false});
                    setEditUiMenu={setEditUiMenu}
                    //movies={moviesSaved} // нужно для первоначальной загрузки, ниже пропс с фильмами, но уже после поиска и т.д


                    inSavedMovies={inSavedMovies}


                      messageInputSearch={messageInputSearch}
                      toggleCheckbox={toggleCheckbox}
                      setToggleCheckbox={setToggleCheckbox}
                      setMessageForNotFound={setMessageForNotFound}
                      messageForNotFound={messageForNotFound}
                      handleinitialMovies={handleinitialMoviesInSavedMovies}
                      dataButtonNext={dataButtonNext}
                      //hahdleDeleteInSadedMovies={hahdleDeleteInSadedMovies}
                      hahdleDeleteAndAddSadedMovies={
                        hahdleDeleteAndAddSadedMovies
                      }

                      moviesSaved={moviesSavedData}
                      typeEditUiMenu={typeEditUiMenu}
                    ></SavedMovies>
                    <Footer></Footer>
                  </>
                </ProtectedRoute>
              }
            />
            <Route
            path="*" element={
            <ErrorNotFoun
              setVisibleErrorNotFound={setVisibleErrorNotFound}
              isVisibleErrorNotFound={isVisibleErrorNotFound}
              badRoute={true}
            ></ErrorNotFoun>}




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
            setEditNavigationMenuOpen={setEditNavigationMenuOpen}
          ></Menu>
          <ErrorNotFoun
            setVisibleErrorNotFound={setVisibleErrorNotFound}
            isVisibleErrorNotFound={isVisibleErrorNotFound}
          ></ErrorNotFoun>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
