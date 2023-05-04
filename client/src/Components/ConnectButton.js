import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';

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
      <Button
        variant="primary"
        onClick={() => setShowModal(true)}
        style={{
          backgroundColor: '#3f5c88',
          border: 'none',
          borderRadius: '5px',
          fontSize: '1.2rem',
          fontWeight: '500',
          padding: '10px 20px',
          margin: '0 10px',
        }}
      >
        Connexion
        <Icon.Person size="1.2em" style={{ marginLeft: '10px' }} />
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#3f5c88' }}>
            Connect to your account
          </Modal.Title>
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
              <Link
                to="/signup"
                style={{
                  color: '#3f5c88',
                  textDecoration: 'none',
                  margin: '5px',
                  fontWeight: '500',
                }}
              >
                Créer un compte
              </Link>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              style={{
                backgroundColor: '#3f5c88',
                border: 'none',
                borderRadius: '5px',
                fontSize: '1.2rem',
                fontWeight: '500',
                marginTop: '20px',
                padding: '10px 20px',
              }}
            >
              Connect
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            style={{
              backgroundColor: '#000',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1.2rem',
              fontWeight: '500',
              padding: '10px 20px',
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConnectButton;
