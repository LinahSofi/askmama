import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spinner, Button, Alert } from 'react-bootstrap';
import AnswerModal from '../components/AnswerModal';
import API from '../api'; // ✅ use shared axios instance

function QuestionView() {
  const { id } = useParams(); // category ID
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await API.get(`/questions/category/${id}`); // ✅ clean endpoint
        setQuestions(res.data);
      } catch (err) {
        console.error('Failed to fetch questions:', err);
        setError('Could not load questions.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [id]);

  const handleOpenModal = (questionId) => {
    setSelectedQuestionId(questionId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedQuestionId(null);
  };

  const handleAnswerSubmitted = (newAnswer) => {
    console.log('Answer submitted:', newAnswer);
    // Optionally: refresh questions or add optimistic update
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h2>Questions</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {questions.length === 0 ? (
        <p className="text-muted">No questions found in this category.</p>
      ) : (
        questions.map((q) => (
          <Card key={q._id} className="mb-3">
            <Card.Body>
              <Card.Text><strong>{q.text}</strong></Card.Text>
              <Button variant="outline-primary" onClick={() => handleOpenModal(q._id)}>
                Submit Answer
              </Button>
            </Card.Body>
          </Card>
        ))
      )}

      <AnswerModal
        show={showModal}
        handleClose={handleCloseModal}
        questionId={selectedQuestionId}
        onAnswerSubmitted={handleAnswerSubmitted}
      />
    </div>
  );
}

export default QuestionView;