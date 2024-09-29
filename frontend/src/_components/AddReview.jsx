import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddReview = () => {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Name:', name);
    console.log('Review:', review);
  };

  return (
    <div className="container py-5" style={{ backgroundColor: "#e6e2df", maxWidth: "800px" }}>
      <h2 className="text-center mb-4">Add Your Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="review" className="form-label">Review</label>
          <textarea
            className="form-control"
            id="review"
            rows="4"
            placeholder="Enter your review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn"
          style={{ backgroundColor: "#CB1276", color: "#fff" }}
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;