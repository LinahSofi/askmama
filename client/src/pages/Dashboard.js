import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5050/api/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="mt-4">
      <h2>Welcome to AskMama</h2>
      <p>Select a category to view questions:</p>

      <div className="row">
        {categories.map((cat) => (
          <div className="col-md-4 mb-3" key={cat._id}>
            <Card>
              <Card.Body>
                <Card.Title>{cat.name}</Card.Title>
                <Link to={`/category/${cat._id}`}>
                  <Button variant="primary">View Questions</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;