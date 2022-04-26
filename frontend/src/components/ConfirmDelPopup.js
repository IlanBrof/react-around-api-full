import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmDelPopup(props) {
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={props.onSubmit}
      name="delete-card-popup"
      headerText="Delete card"
      buttonText="Delete Permenantly"
    >
      <p className="popup-menu__text">
        Are you sure you want to delete this image?
      </p>
    </PopupWithForm>
  );
}

export default ConfirmDelPopup;
