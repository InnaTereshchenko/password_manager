import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const ModalAddButton = ({ addNewAccount }) => {
  const [open, setOpen] = useState(false);
  const [modalSize, setModalSize] = useState('');
  const [accountName, setAccountName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('Account');

  const show = size => () => {
    setOpen(true);
    setModalSize(size);
  };

  const close = () => setOpen(false);

  const handleAddClick = () => {
    close();
    const newAccount = {
      id: new Date().getTime(),
      name: accountName,
      username,
      password,
      type,
    };

    setAccountName('');
    setUsername('');
    setPassword('');
    setType('Account');
    addNewAccount(newAccount);
  };

  return (
    <Modal
      size={modalSize}
      open={open}
      onClose={close}
      trigger={<Button onClick={show('mini')}>Add account</Button>}
    >
      <Modal.Header>Add account</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <form
            onSubmit={handleAddClick}
            className="pure-form pure-form-stacked"
          >
            <input
              type="text"
              placeholder="Account name"
              value={accountName}
              onChange={e => setAccountName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <select value={type} onChange={e => setType(e.target.value)}>
              <option>Account</option>
              <option>Email</option>
              <option>Device</option>
              <option>Server</option>
            </select>
            <Button
              positive
              content="Add"
              type="submit"
            />
          </form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

ModalAddButton.propTypes = {
  addNewAccount: PropTypes.func.isRequired,
};

export default ModalAddButton;
