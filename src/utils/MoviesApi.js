class MoviesApi {
  constructor(config) {
    this._baseUrl = config.baseUrl;
  }

  handleResponse(res) {
    if (res.ok) {
      return res.json();

    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  getInitialMoviesFrombeatfilmMovies() {
    return "ssss";
    //const beatfilmMoviesOllMuvies = JSON.parse(localStorage.getItem("beatfilmMoviesOllMuvies"));
   // if(beatfilmMoviesOllMuvies) {
      //return beatfilmMoviesOllMuvies;
    // } else {
    //   this.getInitialMovies().then((data)=> {
    //     localStorage.setItem("beatfilmMoviesOllMuvies", JSON.stringify(data));
    //     return data;
    //   });
    //}
  }

  //получаем данные карточек для дальнейшей вставки
  getInitialMovies() {
    console.log("Запрашиваю все фильмы с beatfilm-movies");

    return fetch(this._baseUrl, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this.handleResponse(res));
  }

//  //получаем данные карточек для дальнейшей вставки
//  getInitialMoviesImages(url) {
//   return fetch(`this._baseUrl ${url}`, {
//     method: "GET",
//     headers: this._headers,
//   }).then((res) => this.handleResponse(res));
// }









  //!!!USER  получаем данные с сервера о пользователе
  getInitialUser() {
    return fetch(`${this._baseUrl}users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this.handleResponse(res));
  }

  //!!USER
  patchUserInfoNameAbout(name, email) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then((res) => this.handleResponse(res));
  }

  postCard(name, link) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this.handleResponse(res));
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this.handleResponse(res));
  }

  getOneCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this.handleResponse(res));
  }

  changeLikeCardStatus(id, met) {
    return fetch(`${this._baseUrl}cards/${id}/likes`, {
      method: met,
      headers: this._headers,
    }).then((res) => this.handleResponse(res));
  }

  deleteLikeCard(id) {
    return fetch(`${this._baseUrl}cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this.handleResponse(res));
  }

  //!!!USER
  patchAvatar(link) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => this.handleResponse(res));
  }

  getTwtForNewApi(jwt) {
    this._headers = this._changleHeaders(jwt);
  }

  _changleHeaders(changleJwt) {
    return {Authorization: `Bearer ${changleJwt}`,
    "Content-Type": "application/json",}
  }
}

const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
});

export { MoviesApi };

export { moviesApi };
