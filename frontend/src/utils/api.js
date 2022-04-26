class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._token = options.token;
    this._headers = {
      authorization: this._token,
      'Content-type': 'application/json',
    };
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      console.log('Something went wrong', response.status, response.statusText);
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

  async editUserInfo(name, about) {
    const response = await fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
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
    const response = await fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    });
    return this._checkResponse(response);
  }

  async dislike(cardId) {
    const response = await fetch(`${this._url}/cards/likes/${cardId}`, {
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
  baseUrl: 'https://around.nomoreparties.co/v1/group-12',
  token: '10d5550b-e17c-437f-9d04-3dde6b160e5d',
});

export default api;
