class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._token = options.token;
    this._headers = {
      'Content-type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    };
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      console.log(response.status, response.statusText);
    }
  }

  async getInitialCards() {
    const response = await fetch(`${this._url}/cards`, {
      headers: this._headers,
    });
    return this._checkResponse(response);
  }

  async getUserInfo() {
    const response = await fetch(`${this._url}/users/me`, {
      headers: this._headers,
    });
    return this._checkResponse(response);
  }

  async editUserInfo(name, about, avatar) {
    const response = await fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
        avatar: avatar,
      }),
    });
    return this._checkResponse(response);
  }

  async uploadUserCard(name, link) {
    const response = await fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name: name, link: link }),
    });
    return this._checkResponse(response);
  }

  async deleteCard(cardId) {
    const response = await fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
    return this._checkResponse(response);
  }

  async like(cardId) {
    const response = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    });
    return this._checkResponse(response);
  }

  async dislike(cardId) {
    const response = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    });
    return this._checkResponse(response);
  }

  async setUserAvatar(link) {
    const response = await fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: link }),
    });
    return this._checkResponse(response);
  }
}

const api = new Api({
  baseUrl: 'https://api.ilanbrof.students.nomoreparties.sbs',
  // baseUrl: 'http://localhost:3000',
});

export default api;
