import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const ConnectButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleConnect = (e) => {
    e.preventDefault();
    // Perform connect functionality with email and password
    setShowModal(false);
  };

  return (
    <>
      <Button variant="light" onClick={() => setShowModal(true)}>
        Connexion
        <Icon.Person size="1.2em"></Icon.Person>
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Connect to your account</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleConnect}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <Link style={{ textDecoration: 'none', margin: '5px' }}>
                Créer un compte
              </Link>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              style={{ marginTop: '20px' }}
            >
              Connect
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConnectButton;
