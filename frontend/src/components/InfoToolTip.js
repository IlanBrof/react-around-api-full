import successLogo from '../images/login_success.svg';
import failLogo from '../images/login_fail.svg';

function infoToolTip(props) {

    function renderInfoToolTipSuccess() { 
        return (
            <div className={`popup-menu ${props.isOpen && 'popup-menu_opened'}`}>
              <div className="popup-menu__edit-form">
                <button
                  onClick={props.onClose}
                  className="popup-menu__close-button"
                  type="button"
                  aria-label="close-button"
                ></button>
                <img
                  src={successLogo}
                  alt="login_success"
                  className="popup-menu__tooltip-logo"
                ></img>
                <h3 className="popup-menu__tooltip-text">
                  Success! You have now been registered.
                </h3>
              </div>
            </div>
          );
    }

    function renderInfoToolTipFail() { 
        return (
            <div className={`popup-menu ${props.isOpen && 'popup-menu_opened'}`}>
              <div className="popup-menu__edit-form">
                <button
                  onClick={props.onClose}
                  className="popup-menu__close-button"
                  type="button"
                  aria-label="close-button"
                ></button>
                <img
                  src={failLogo}
                  alt="login_fail"
                  className="popup-menu__tooltip-logo"
                ></img>
                <h3 className="popup-menu__tooltip-text">
                Oops, something went wrong! Please try again.
                </h3>
              </div>
            </div>
          );
    }
    if (props.registrationSuccess) {
        return renderInfoToolTipSuccess();    
    }
    return renderInfoToolTipFail();
    
}

export default infoToolTip;
