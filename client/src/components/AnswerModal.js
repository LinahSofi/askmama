import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import API from '../api';

function AnswerModal({ show, handleClose, questionId, onAnswerSubmitted }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!text) {
      setError('Answer text is required.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId'); // make sure you store this at login/register

      if (!userId) {
        setError('User not logged in.');
        return;
      }

      const res = await axios.post(
        `${API}/api/answers`,
        {
          question: questionId,
          user: userId,
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onAnswerSubmitted(res.data);
      setText('');
      handleClose();
    } catch (err) {
      console.error(err);
      setError('Failed to submit answer.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Submit Answer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="answerText">
            <Form.Label>Your Answer</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AnswerModal;