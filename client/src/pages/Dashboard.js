import React, { useEffect, useState } from 'react';
import CategoriesSidebar from '../components/CategoriesSidebar';
import API from '../api'; // ✅ import shared axios instance

function Dashboard() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get('/categories'); // ✅ clean endpoint path
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
      <CategoriesSidebar categories={categories} />
    </div>
  );
}

export default Dashboard;