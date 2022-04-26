// import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useRef, useEffect } from 'react';

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="change-profilePic"
      headerText="Change Profile Picture"
      buttonText="Save"
    >
      <input
        ref={avatarRef}
        className="popup-menu__input popup-menu__input_type_url"
        name="link"
        type="url"
        placeholder="Profile Image link"
        required
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
