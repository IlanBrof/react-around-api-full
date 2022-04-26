import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [cardName, setCardName] = React.useState('');
  const [cardLink, setCardLink] = React.useState('');

  React.useEffect(() => {
    setCardName('');
    setCardLink('');
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddCard({
      name: cardName,
      link: cardLink,
    });
  }

  function handleCardNameUpdate(e) {
    setCardName(e.target.value);
  }

  function handleCardLinkUpdate(e) {
    setCardLink(e.target.value);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="add-card"
      headerText="New Place"
      buttonText="Create"
    >
      <input
        onChange={handleCardNameUpdate}
        value={cardName || ''}
        className="popup-menu__input popup-menu__input_type_title"
        name="name"
        type="text"
        placeholder="Name"
        required
      />
      <input
        onChange={handleCardLinkUpdate}
        value={cardLink || ''}
        className="popup-menu__input popup-menu__input_type_url"
        name="link"
        type="url"
        placeholder="Image link"
        required
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
