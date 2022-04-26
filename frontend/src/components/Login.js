import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!password || !password) {
      console.log('Something went wrong, Please try again.');
      return;
    }
    props.handleLogin(email, password);
  };

    return (
    <div className="authorisation">
      <form className="authorisation__form" name="login" onSubmit={handleSubmit}>
        <h3 className="authorisation__title">Login</h3>
        <input
          type="email"
          className="authorisation__input"
          name="email"
          id="login-email-input"
            placeholder="Email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          required
        />
        <input
          type="password"
          className="authorisation__input"
          name="password"
          id="login-password-input"
            placeholder="Password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
          required
        />
        <button
          type="submit"
          className="authorisation__button"
        >
          Login
        </button>
      </form>
      <Link className="authorisation__underline" to="/signup">
        Not a member yet? Sign up here!
      </Link>
    </div>
  );
}

export default Login;
