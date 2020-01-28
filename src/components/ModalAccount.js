import React from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const ModalAccount = ({
  modalAccountValue,
  setModalAccountValue,
  currentAccount,
  deleteAccount,
}) => {
  const handleDeleteClick = () => {
    setModalAccountValue(false);
    deleteAccount(currentAccount.id);
  };

  return (
    <Modal
      open={modalAccountValue}
      onClose={() => setModalAccountValue(false)}
      size="mini"
    >
      <Modal.Header>Account info</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <p>
            Account name:
            {' '}
            <strong>{currentAccount.name}</strong>
          </p>
          <p>
            Username:
            {' '}
            <strong>{currentAccount.username}</strong>
          </p>
          <p>
            Password:
            {' '}
            <strong>{currentAccount.password}</strong>
          </p>
          <p>
            Type:
            {' '}
            <strong>{currentAccount.type}</strong>
          </p>
          <Button
            color="green"
            onClick={() => setModalAccountValue(false)}
          >
            Close
          </Button>
          <Button color="red" onClick={handleDeleteClick}>
            <Icon name="remove" />
            Delete
          </Button>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

ModalAccount.propTypes = {
  modalAccountValue: PropTypes.bool.isRequired,
  setModalAccountValue: PropTypes.func.isRequired,
  currentAccount: PropTypes.shape().isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

export default ModalAccount;
