import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LogIn = ({ authorization, wrongLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLofInSubmit = (event) => {
    event.preventDefault();
    authorization(username, password);
  };

  return (
    <div className="login">
      <h2 className="login__header">Log In</h2>
      <form
        className="pure-form pure-form-stacked"
        onSubmit={handleLofInSubmit}
      >
        <label>
          Username
          <input
            type="text"
            required
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <div className="login__button-and-link">
          <button
            type="submit"
            className="pure-button pure-button-primary login__button"
          >
            Log in
          </button>
          <Link to="/register" className="login__link">Register</Link>
        </div>
      </form>
      <p className={`login__wrong ${wrongLogin}`}>*Wrong email/password</p>
    </div>
  );
};

LogIn.propTypes = {
  authorization: PropTypes.func.isRequired,
  wrongLogin: PropTypes.string.isRequired,
};

export default LogIn;
