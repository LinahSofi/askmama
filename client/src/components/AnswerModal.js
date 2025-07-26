import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

function AnswerModal({ show, handleClose, questionId, onAnswerSubmitted }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) {
      setError('Answer text is required.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5050/api/answers', {
        question: questionId,
        user: '68783db3cf5e4872873923cc', // hardcoded demo user for now
        text
      });

      onAnswerSubmitted(res.data); // pass answer up
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