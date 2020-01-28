import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory, Link } from 'react-router-dom';
import './App.scss';
import LogIn from './components/LogIn';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  const history = useHistory();
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem('users')) || [],
  );
  const [currentUserId, setCurrentUserId] = useState(
    JSON.parse(localStorage.getItem('currentUserId')) || -1,
  );

  useEffect(() => localStorage.setItem('users', JSON.stringify(users)));
  useEffect(() => localStorage.setItem(
    'currentUserId', JSON.stringify(currentUserId)
  ));
  const [wrongLogin, setWrongLogin] = useState('');

  const registerNewUser = (name, username, password) => {
    const newUsers = [
      ...users, {
        id: new Date().getTime(),
        name,
        username,
        password,
        accounts: [],
      }];

    setUsers(newUsers);
  };

  const authorization = (username, password) => {
    const currentU = users.find(
      user => user.username === username && user.password === password
    );

    if (currentU !== undefined) {
      setCurrentUserId(currentU.id);
      history.push('/dashboard');
      setWrongLogin('');
    } else {
      setWrongLogin('login__wrong-active');
    }
  };

  const addNewAccount = (newAccount) => {
    const currUserIndex = users.indexOf(
      users.find(user => user.id === currentUserId)
    );

    setUsers([
      ...users.filter(user => user.id !== currentUserId),
      users[currUserIndex] = {
        ...users[currUserIndex],
        accounts: [
          ...users[currUserIndex].accounts,
          newAccount,
        ],
      },
    ]);
  };

  const deleteAccount = (accountId) => {
    const currUserIndex = users.indexOf(
      users.find(user => user.id === currentUserId)
    );

    setUsers([
      ...users.filter(user => user.id !== currentUserId),
      users[currUserIndex] = {
        ...users[currUserIndex],
        accounts: [
          ...users[currUserIndex].accounts.filter(acc => acc.id !== accountId),
        ],
      },
    ]);
  };

  return (
    <div className="page">
      <h1 className="page__header">******** manager</h1>
      <img src="./images/favicon_key.png" className="page__img" alt="key" />
      <nav className="page__nav navigation">
        <ul className="navigation__list">
          <li className="navigation__item">
            <Link to="/" className="navigation__link">Log in</Link>
          </li>
          <li className="navigation__item">
            <Link to="/register" className="navigation__link">Register</Link>
          </li>
          <li className="navigation__item">
            <Link to="/dashboard" className="navigation__link">Dashboard</Link>
          </li>
          <li className="navigation__item">
            <Link
              to="/"
              onClick={() => setCurrentUserId(-1)}
              className="navigation__link"
            >
              Log out
            </Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact>
          <LogIn authorization={authorization} wrongLogin={wrongLogin} />
        </Route>
        <Route path="/register" exact>
          <Register registerNewUser={registerNewUser} />
        </Route>
        <Route path="/dashboard">
          <Dashboard
            currentUserId={currentUserId}
            users={users}
            addNewAccount={addNewAccount}
            deleteAccount={deleteAccount}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
