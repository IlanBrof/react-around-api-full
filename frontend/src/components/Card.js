import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
  const imageDataForPopup = () => {
    props.onClick();
    props.updateCardData(card);
  };

  const currentUser = React.useContext(CurrentUserContext);

  // Checking if the current user is the owner of the current card
  const card = props.card;
  const isOwn = card.owner === currentUser._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const cardEraseButtonClassName = `card__erase ${
    isOwn ? 'card__erase' : 'card__erase_hidden'
  }`;

  // Check if the card was liked by the current user
  const isLiked = card.likes.some((i) => i === currentUser._id);

  // Create a variable which you then set in `className` for the like button
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? 'card__like-button_active' : 'card__like-button'
  }`;

  function handleLikeClick() {
    props.onCardLike(card);
  }

  function handleDeleteClick() {
    props.onCardDelete(card);
  }

  return (
    <li className="card">
      <button
        className={cardEraseButtonClassName}
        type="button"
        aria-label="erase-button"
        onClick={handleDeleteClick}
      ></button>
      <img
        className="card__image"
        onClick={imageDataForPopup}
        src={card.link}
        alt={card.name}
      />
      <div className="card__photo-description">
        <h2 className="card__text">{card.name}</h2>
        <div className="card__heart-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="like-button"
            onClick={handleLikeClick}
          ></button>
          <span className="card__like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
