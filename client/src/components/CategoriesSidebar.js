import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';

function CategoriesSidebar({ categories, onSelect }) {
  const [activeId, setActiveId] = useState(null);

  if (!categories || categories.length === 0) {
    return <p className="text-muted p-2">No categories found.</p>;
  }

  const handleClick = (cat) => {
    setActiveId(cat._id);
    onSelect(cat);
  };

  return (
    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
      <ListGroup>
        {categories.map((cat) => (
          <ListGroup.Item
            key={cat._id}
            action
            onClick={() => handleClick(cat)}
            active={cat._id === activeId}
            style={{ cursor: 'pointer' }}
          >
            {cat.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default CategoriesSidebar;