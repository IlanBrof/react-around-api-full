import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {

  const hamburgerIcon = (
    <svg
      className="nav-hamburger-icon"
      viewBox="0 0 100 80"
      width="100%"
      height="100%"
      fill="white"
    >
      <rect width="100" height="10"></rect>
      <rect y="30" width="100" height="10"></rect>
      <rect y="60" width="100" height="10"></rect>
    </svg>
  );

  function renderMainHeader() {
    return (
      <header className="header">
        <div
          className={`header__hamburger-menu-items ${
            props.isOpen && 'header__hamburger-menu-items_active'
          }`}
        >
          <div className="header__user header__user_mobile">{props.email}</div>
          <button
            className="header__logout header__logout_mobile"
            onClick={props.handleLogout}
          >
            Log out
          </button>
        </div>
        <div className="header__alignment">
          <img className="logo" src={logo} id="logo-icon" alt="logo"></img>
          <button
            className="header_hamburger-menu"
            onClick={props.onHamburgerMenuClick}
          >
            {hamburgerIcon}
          </button>
        </div>

        <div className="header__user-container">
          <div className="header__user">{props.email}</div>
          <button className="header__logout" onClick={props.handleLogout}>
            Log out
          </button>
        </div>
      </header>
    );
  }

  function renderRegisterHeader() {
    return (
      <header className="header">
        <div className="header__alignment">
          <img className="logo" src={logo} id="logo-icon" alt="logo"></img>
          <Link className="header__link-btn" to={'/login'}>
            Log In
          </Link>
        </div>
      </header>
    );
  }

  function renderLoginHeader() {
    return (
      <header className="header">
        <div className="header__alignment">
          <img className="logo" src={logo} id="logo-icon" alt="logo"></img>
          <Link className="header__link-btn" to={'/signup'}>
            Sign Up
          </Link>
        </div>
      </header>
    );
  }

  if (props.type === 'login') {
    return renderLoginHeader();
  }

  if (props.type === 'signup') {
    return renderRegisterHeader();
  }

  return renderMainHeader();
}

export default Header;
