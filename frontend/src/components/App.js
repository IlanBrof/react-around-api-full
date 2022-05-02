import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDelPopup from './ConfirmDelPopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoToolTip from './InfoToolTip';
import * as auth from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isCardImagePopupOpen, setIsCardImagePopupOpen] = React.useState(false);
  const [isConfirmDelPopupOpen, setIsConfirmDelPopupOpen] =
    React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [cardData, setCardData] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [cardDelConfirm, setCardDelConfirm] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [registrationSuccess, setRegistrationSuccess] = React.useState(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = React.useState(false);

  const history = useHistory();

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            const data = {
              email: res.email,
              id: res._id,
            };
            setIsLoggedIn(true);
            setUserData(data);
          }
        })
        .catch((err) => {
          console.log('WTH?', err);
        });
    }
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn]);

  function handleRegistration(email, password) {
    try {
      auth
        .signup(email, password)
        .then(() => {
          setRegistrationSuccess(true);
          history.push('/');
        })
        .catch((err) => {
          setRegistrationSuccess(false);
          console.log('What', err);
        });
    } finally {
      setIsInfoToolTipOpen(true);
    }
  }

  function handleLogin(email, password) {
    auth
      .signin(email, password)
      .then((data) => {
        if (data) {
          const userData = {
            email: email,
            token: data,
          };
          setUserData(userData);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setRegistrationSuccess(false);
        setIsInfoToolTipOpen(true);
      });
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setUserData({});
    setIsLoggedIn(false);
    history.push('/');
  }

  React.useEffect(() => {
    if (!isLoggedIn) return;
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (!isLoggedIn) return;
    (async function () {
      setLoading(true);
      try {
        const cardsData = await api.getInitialCards();
        if (cardsData) {
          setCards(cardsData);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [isLoggedIn]);

  function handleUserInfo(userData) {
    try {
      api.editUserInfo(userData.name, userData.about).then((data) => {
        setUserData(data);
        closeAllPopups();
      });
    } catch (err) {
      console.log(err);
    }
  }

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((i) => i === currentUser._id);
    // Send a request to the API and getting the updated card data
    if (!isLiked) {
      api
        .like(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (isLiked) {
      api
        .dislike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleAddCard(cardData) {
    api
      .uploadUserCard(cardData.name, cardData.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(e) {
    e.preventDefault();
    api
      .deleteCard(cardDelConfirm._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardDelConfirm._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(userData) {
    try {
      api.setUserAvatar(userData.avatar).then((data) => {
        setUserData(data);
        closeAllPopups();
      });
    } catch (err) {
      console.log(err);
    }
  }

  function handleEditProfilePopupClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddCardPopupClick() {
    setIsAddCardPopupOpen(true);
  }

  function handleEditAvatarPopupClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardImagePopupClick() {
    setIsCardImagePopupOpen(true);
  }

  function handleConfirmDelPopupClick(card) {
    setIsConfirmDelPopupOpen(true);
    setCardDelConfirm(card);
  }

  function handleHamburgerMenuClick() {
    if (!isHamburgerMenuOpen) {
      setIsHamburgerMenuOpen(true);
    } else {
      setIsHamburgerMenuOpen(false);
    }
  }

  function handleCardData(cardData) {
    setCardData(cardData);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsCardImagePopupOpen(false);
    setIsConfirmDelPopupOpen(false);
    setIsInfoToolTipOpen(false);
    setIsHamburgerMenuOpen(false);
  }

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  React.useEffect(() => {
    const closeByClick = (e) => {
      if (e.target.classList.contains('popup-menu')) {
        closeAllPopups();
      }
    };

    document.addEventListener('click', closeByClick);

    return () => document.removeEventListener('click', closeByClick);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page-container">
        <Switch>
          <Route path="/login">
            <Header type="login" />
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <Header type="signup" />
            <Register handleRegistration={handleRegistration} />
          </Route>

          <ProtectedRoute path="/" isLoggedIn={isLoggedIn}>
            <Header
              email={userData.email}
              handleLogout={handleLogout}
              onHamburgerMenuClick={handleHamburgerMenuClick}
              isOpen={isHamburgerMenuOpen}
            />
            <Main
              onEditProfileClick={handleEditProfilePopupClick}
              onAddCardClick={handleAddCardPopupClick}
              onEditAvatarClick={handleEditAvatarPopupClick}
              onCardImageClick={handleCardImagePopupClick}
              updateCardData={handleCardData}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleConfirmDelPopupClick}
              loading={loading}
            />

            <Footer />
          </ProtectedRoute>
        </Switch>
        <InfoToolTip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          registrationSuccess={registrationSuccess}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUserInfo={handleUserInfo}
        />

        <AddPlacePopup
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCard}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup
          isOpen={isCardImagePopupOpen}
          onClose={closeAllPopups}
          cardData={cardData}
        />

        <ConfirmDelPopup
          isOpen={isConfirmDelPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
