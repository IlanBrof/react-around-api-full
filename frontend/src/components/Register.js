import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!password || !password) {
      console.log('Something went wrong, Please try again.');
      return;
    }
    props.handleRegistration(email, password);
  };

  return (
    <div className="authorisation">
      <form
        className="authorisation__form"
        name="sign-up"
        onSubmit={handleSubmit}
      >
        <h3 className="authorisation__title">Sign Up</h3>
        <input
          type="email"
          className="authorisation__input"
          name="email"
          id="sign-up-email-input"
          placeholder="Email"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          required
        />
        <input
          type="password"
          className="authorisation__input"
          name="password"
          id="sign-up-password-input"
          placeholder="Password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          required
        />
        <button type="submit" className="authorisation__button">
          Sign Up
        </button>
      </form>
      <Link className="authorisation__underline" to="/login">
        Already a member? Log in here!
      </Link>
    </div>
  );
}

export default Register;
