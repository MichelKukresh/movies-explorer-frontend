class MainApi {
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





  deleteMovie(id) {
    return fetch(`${this._baseUrl}movies/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this.handleResponse(res));
  }

  savededMovies(item) {
    return fetch(`${this._baseUrl}movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        country: item.country,
        director: item.director,
        duration: item.duration,
        year: item.year,
        description: item.description,
        image: item.image,
        trailerLink: item.trailerLink,
        thumbnail: item.thumbnail,
        nameRU: item.nameRU,
        nameEN: item.nameEN,
        movieId: item.movieId,
      }),
    }).then((res) => this.handleResponse(res));
  }

    //получаем данные карточек для дальнейшей вставки
    getInitialMovies() {
      console.log("Запрашиваю все сохраненные фильмы");

      return fetch(`${this._baseUrl}movies`, {
        method: "GET",
        headers: this._headers,
      }).then((res) => this.handleResponse(res));
    }

  //!!!USER  получаем данные с сервера о пользователе
  getInitialUser() {
    return fetch(`${this._baseUrl}users/me`, {
      method: "GET",
      headers: this._headers,
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

const api = new MainApi({
  baseUrl: "https://api.kukreshma.moviesexplorer.nomoredomains.sbs/",
});

export { MainApi };

export { api };
