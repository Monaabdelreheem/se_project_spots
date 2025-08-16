// utils/Api.js
import { checkResponse } from "./helpers.js";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;   
    this._headers = headers;   
  }

  _request(path, options = {}) {
    return fetch(`${this._baseUrl}${path}`, {
      headers: this._headers,
      ...options,
    }).then(checkResponse);
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  getInitialCards() {
    return this._request("/cards");
  }

  getUserInfo() {
    return this._request("/users/me");
  }

  addNewCard({ name, link }) {
    return this._request("/cards", {
      method: "POST",
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, { method: "DELETE" });
  }

  handleLike(cardId, isLiked) {
    return this._request(`/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
    });
  }

  editUserInfo({ name, about }) {
    return this._request("/users/me", {
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    });
  }

  editAvatarInfo({ avatar }) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    });
  }
}

export default Api;

// import { checkResponse } from "./helpers";  

// class Api {
//   constructor({ baseUrl, headers }) {
//     this._baseUrl = baseUrl;
//     this._headers = headers;
//   }

//   _request(path, options = {}) {
//     return fetch(`${this._baseUrl}${path}`, {
//       headers: this._headers,
//       ...options,
//     }).then(checkResponse);
//   }

//   getAppInfo() {
//     return Promise.all([this.getUserInfo(), this.getInitialCards()]);
//   }

//   getInitialCards() {
//     return this._request("/cards");
//   }

//   getUserInfo() {
//     return this._request("/users/me");
//   }

//   addNewCard({ name, link }) {
//     return this._request("/cards", {
//       method: "POST",
//       body: JSON.stringify({ name, link }),
//     });
//   }

//   deleteCard(cardId) {
//     return this._request(`/cards/${cardId}`, { method: "DELETE" });
//   }

//   handleLike(cardId, isLiked) {
//     return this._request(`/cards/${cardId}/likes`, {
//       method: isLiked ? "DELETE" : "PUT",
//     });
//   }

//   editUserInfo({ name, about }) {
//     return this._request("/users/me", {
//       method: "PATCH",
//       body: JSON.stringify({ name, about }),
//     });
//   }

//   editAvatarInfo({ avatar }) {
//     return this._request("/users/me/avatar", {
//       method: "PATCH",
//       body: JSON.stringify({ avatar }),
//     });
//   }
// }

// export default Api;

// //   getInitialCards() {
// //     return fetch(`${this._baseUrl}/cards`, {
// //       headers: this._headers,
// //     }).then((res) => {
// //       if (res.ok) {
// //         return res.json();
// //       }
// //       return Promise.reject(`Error: ${res.status}`);
// //     });
// //   }

// //   getUserInfo() {
// //     return fetch(`${this._baseUrl}/users/me`, {
// //       headers: this._headers,
// //     }).then((res) => {
// //       if (res.ok) {
// //         return res.json();
// //       }
// //       return Promise.reject(`Error: ${res.status}`);
// //     });
// //   }

// //   addNewCard({ name, link }) {
// //     return fetch(`${this._baseUrl}/cards`, {
// //       method: "POST",
// //       headers: this._headers,
// //       body: JSON.stringify({
// //         name,
// //         link,
// //       }),
// //     }).then((res) => {
// //       if (res.ok) {
// //         return res.json();
// //       }
// //       return Promise.reject(`Error: ${res.status}`);
// //     });
// //   }

// //   deleteCard(cardId) {
// //     return fetch(`${this._baseUrl}/cards/${cardId}`, {
// //       method: "DELETE",
// //       headers: this._headers,
// //     }).then((res) => {
// //       if (res.ok) {
// //         return res.json();
// //       }
// //       return Promise.reject(`Error: ${res.status}`);
// //     });
// //   }

// //   handleLike(cardId, isLiked) {
// //     return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
// //       method: isLiked ? "DELETE" : "PUT",
// //       headers: this._headers,
// //     }).then((res) => {
// //       if (res.ok) {
// //         return res.json();
// //       }
// //       return Promise.reject(`Error: ${res.status}`);
// //     });
// //   }

// //   editUserInfo({ name, about }) {
// //     return fetch(`${this._baseUrl}/users/me`, {
// //       method: "PATCH",
// //       headers: this._headers,
// //       body: JSON.stringify({
// //         name,
// //         about,
// //       }),
// //     }).then((res) => {
// //       if (res.ok) {
// //         return res.json();
// //       }
// //       return Promise.reject(`Error: ${res.status}`);
// //     });
// //   }

// //   editAvatarInfo({ avatar }) {
// //     return fetch(`${this._baseUrl}/users/me/avatar`, {
// //       method: "PATCH",
// //       headers: this._headers,
// //       body: JSON.stringify({
// //         avatar
// //       }),
// //     }).then((res) => {
// //       if (res.ok) {
// //         return res.json();
// //       }
// //       return Promise.reject(`Error: ${res.status}`);
// //     });
// //   }
// // }
  
// //   // other methods for working with the API


// // export default Api;


