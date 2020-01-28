import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const Register = ({ registerNewUser }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmitRegister = (event) => {
    event.preventDefault();
    registerNewUser(name, username, password);
    setName('');
    setUsername('');
    setPassword('');
    history.push('/');
  };

  return (
    <div className="register">
      <h2 className="register__header">Register</h2>
      <form
        className="pure-form pure-form-stacked"
        onSubmit={handleSubmitRegister}
      >
        <lable>
          Name
          <input
            type="text"
            required
            minLength={1}
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </lable>
        <lable>
          Username
          <input
            type="text"
            required
            minLength={1}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </lable>
        <label>
          Password
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <div className="register__button-and-link">
          <button
            type="submit"
            className="pure-button pure-button-primary register__button"
          >
            Register
          </button>
          <Link to="/" className="register__link">Log in</Link>
        </div>
      </form>
    </div>
  );
};

Register.propTypes = {
  registerNewUser: PropTypes.func.isRequired,
};

export default Register;
