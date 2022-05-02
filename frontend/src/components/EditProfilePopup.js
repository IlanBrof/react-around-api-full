import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [profileName, setProfileName] = React.useState('');
  const [profileDescription, setProfileDescription] = React.useState('');

  function handleSubmit(e) {
    // e.preventDefault(); // This will cause the page to reload, the data is not being rendered with this on ,previous projects had this line
    props.onUpdateUserInfo({
      name: profileName,
      about: profileDescription,
    });
  }

  React.useEffect(() => {
    setProfileName(currentUser.name || '');
    setProfileDescription(currentUser.about || '');
  }, [currentUser]);

  function handleProfileNameUpdate(e) {
    setProfileName(e.target.value);
  }

  function handleProfileDescriptionUpdate(e) {
    setProfileDescription(e.target.value);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="edit-profile"
      headerText="Edit profile"
      buttonText="Save"
    >
      <input
        value={profileName}
        onChange={handleProfileNameUpdate}
        className="popup-menu__input popup-menu__input_type_name"
        name="name"
        type="text"
        placeholder="Full Name"
      />
      <input
        value={profileDescription}
        onChange={handleProfileDescriptionUpdate}
        className="popup-menu__input popup-menu__input_type_title"
        name="title"
        type="text"
        placeholder="Title"
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
