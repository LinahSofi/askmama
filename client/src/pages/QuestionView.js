import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Spinner, Button } from 'react-bootstrap';
import AnswerModal from '../components/AnswerModal';

function QuestionView() {
  const { id } = useParams(); // category ID
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/questions/category/${id}`);
        setQuestions(res.data);
      } catch (err) {
        console.error('Failed to fetch questions:', err);
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
    // Optionally handle updates like refetching or UI changes
    console.log('Answer submitted:', newAnswer);
  };

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <div>
      <h2>Questions</h2>
      {questions.map((q) => (
        <Card key={q._id} className="mb-3">
          <Card.Body>
            <Card.Text><strong>{q.text}</strong></Card.Text>
            <Button variant="outline-primary" onClick={() => handleOpenModal(q._id)}>
              Submit Answer
            </Button>
          </Card.Body>
        </Card>
      ))}

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