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
import ScreenSize from "../../utils/hooksScreenSize";

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
  const [messageForNotFound, setMessageForNotFound] = useState("");

  // модуль отображения количесва фильмов в зависимости от разрешения
  const [columnAndRow, srtColumnAndRow] = useState({column: 0, row: 0, card: 0});
  const [changeableArrayDependingScreenSize, setChangeableArrayDependingScreenSize] = useState([]); // массив карточек который идет на отрисовку в зависимости от экрана
  const [dataButtonNext, setDataButtonNext] = useState({isVisible: false, howMuchAddmovies: 0});


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

        api.getInitialMovies().then((data) => setMoviesSaved(data.data)),
        //.then((data) => console.log(moviesSaved)),
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
    setMessageForNotFound("");
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
        const checkMessageForNotFound =
          foundMoviesID.length === 0 ? "Ничего не найдено" : "";
        setMessageForNotFound(checkMessageForNotFound);


        return foundMoviesID;

        // console.log(foundMoviesID);
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
        //setMovies((movies) =>
          //movies.map((c) => (c.id === item.movieId ? nm : c))
          setChangeableArrayDependingScreenSize((changeableArrayDependingScreenSize) =>
          changeableArrayDependingScreenSize.map((c) => (c.id === item.movieId ? nm : c))
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

  // модуль отображения количесва фильмов в зависимости от разрешения, расчитывает сколько добавлять и сколько осталось
      //определяем изначальный массив с ним и будем сравнивать всегда


      //const [columnAndRow, srtColumnAndRow] = useState({column: 0, row: 0, card: 0})
      //const [changeableArrayDependingScreenSize, setChangeableArrayDependingScreenSize] = useState([]);
      //const [dataButtonNext, setDataButtonNext] = useState({isVisible: false, howMuchAddmovies: 0});


  const size = ScreenSize();
  //const maxWithScrin = 1280;
  const middleWithScrin = 768;
  const minWithScrin = 480;


      useEffect(()=> {
       if (size.With < minWithScrin) {
         srtColumnAndRow({column: 1, row: 5, card: 5, add: 2})
       } else if (size.With < middleWithScrin ) {
         srtColumnAndRow({column: 2, row: 8, card: 16, add: 2})
       } else {
         srtColumnAndRow({column: 3, row: 3, card: 12, add: 3})
       }

       changeableArray ();

      //
      //  setChangeableDependingScreenSize(changeableArray);

      }, [size.With, movies])

      // шинкует массив ( сколько было отрисовано по экрану? сколько нужно открывать при нажатии на еще?)
      function changeableArray () {

        const changeableArrayFromRender = movies.slice(0, (columnAndRow.card) );
        setChangeableArrayDependingScreenSize(changeableArrayFromRender);

        const isVisibleNext = changeableArrayFromRender.length >= movies.length ? false : true;
        console.log("gggggggggggggggggggg");
        console.log(changeableArrayFromRender.length);
        console.log(movies.length);
        console.log(isVisibleNext);
        setDataButtonNext({isVisible: isVisibleNext});
        console.log(dataButtonNext.isVisible);


      }

      function handleButtonNextMovies() {

     //const arr = changeableArrayDependingScreenSize.length + columnAndRow.add;
     console.log(changeableArrayDependingScreenSize);
     setChangeableArrayDependingScreenSize( movies.slice(0, (changeableArrayDependingScreenSize.length + columnAndRow.add)));

     const isVisibleNext = (changeableArrayDependingScreenSize.length + columnAndRow.add) >= movies.length ? false : true;
     console.log(changeableArrayDependingScreenSize);
     console.log(changeableArrayDependingScreenSize.length);
     console.log(movies.length);
        setDataButtonNext({isVisible: isVisibleNext});
        console.log(dataButtonNext.isVisible);



         // первоначально загружает нужно количесво карточек и меняет

         //setChangeableArrayDependingScreenSize(changeableArray);

         //console.log("кнопка еще пока не работает");
         //console.log(changeableArray);

     }

     //console.log(size.With);





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
