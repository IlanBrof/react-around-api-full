import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Loader from './Loader';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile-menu">
        <div className="profile-menu__profile-pic">
          <img
            src={currentUser.avatar}
            className="profile-menu__avatar"
            id="avatar_image"
            alt="avatar image"
          ></img>
          <button
            onClick={props.onEditAvatarClick}
            className="profile-menu__avatar-button"
            type="button"
          ></button>
        </div>
        <div className="profile-menu__info">
          <div className="profile-menu__alignment">
            <h1 className="profile-menu__full-name">{currentUser.name}</h1>
            <button
              onClick={props.onEditProfileClick}
              className="profile-menu__edit-button"
              type="button"
              aria-label="edit-button"
            ></button>
          </div>
          <p className="profile-menu__title">{currentUser.about}</p>
        </div>
        <button
          onClick={props.onAddCardClick}
          className="profile-menu__add-button"
          type="button"
          aria-label="add-button"
        ></button>
      </section>

      <section className="cards">
        <ul className="cards__list">
          {props.loading ? (
            <Loader />
          ) : (
            props.cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onClick={props.onCardImageClick}
                updateCardData={props.updateCardData}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            ))
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;
