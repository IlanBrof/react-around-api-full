function ImagePopup(props) {
  return (
    <div
      className={`popup-menu ${props.isOpen ? 'popup-menu_opened' : ''}`}
      id="popup-menu_image"
    >
      <div className="popup-menu__image-container">
        <div className="popup-menu__image-box">
          <button
            className="popup-menu__close-button"
            onClick={props.onClose}
            id="image_close_button"
            type="button"
            aria-label="close-button"
          ></button>
          <img
            className="popup-menu__image"
            src={props.cardData.link}
            alt="description"
          />
          <div className="popup-menu__text">{props.cardData.name}</div>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;
