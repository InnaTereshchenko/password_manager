import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModalAddButton from './ModalAddButton';
import ModalAccount from './ModalAccount';

const Dashboard = ({ currentUserId, users, addNewAccount, deleteAccount }) => {
  const [modalAccountValue, setModalAccountValue] = useState(false);
  const [currentAccount, setCurrentAccount] = useState({});
  const currentUser = users.find(user => user.id === currentUserId);

  const handleRowClick = (index) => {
    setModalAccountValue(true);
    setCurrentAccount(currentUser.accounts[index]);
  };

  return currentUserId === -1
    ? (
      <h2>Please, log in</h2>
    )
    : (
      <section className="dashboard">
        <h2 className="dashboard__header">
          Hello,
          {' '}
          {currentUser.name}
          !
        </h2>
        <ModalAddButton addNewAccount={addNewAccount} />
        <table className="pure-table dashboard__table">
          <thead>
            <tr>
              <th>Account name</th>
              <th>Username</th>
              <th>Password</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {currentUser.accounts.map((acc, index) => (
              <tr
                onClick={() => handleRowClick(index)}
                className="dashboard__row"
              >
                <td>{acc.name}</td>
                <td>{acc.username}</td>
                <td>{''.padStart(acc.password.length, '*')}</td>
                <td>{acc.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ModalAccount
          modalAccountValue={modalAccountValue}
          setModalAccountValue={setModalAccountValue}
          currentAccount={currentAccount}
          deleteAccount={deleteAccount}
        />
      </section>
    );
};

Dashboard.propTypes = {
  currentUserId: PropTypes.number.isRequired,
  users: PropTypes.shape().isRequired,
  addNewAccount: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

export default Dashboard;
