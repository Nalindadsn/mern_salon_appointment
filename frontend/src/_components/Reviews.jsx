import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../_styles/Reviews.module.css';

const Reviews = () => {
  const [reviews] = useState([]);
  const [loading] = useState(true);
  const [error] = useState(null);

//   useEffect(() => {
//     // Replace with your API endpoint
//     fetch('https://api.example.com/reviews')
//       .then(response => response.json())
//       .then(data => {
//         setReviews(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error loading reviews: {error.message}</p>;

  return (
    <div className="reviews-container container py-5">
      <h2 className="text-center mb-4">Customer Reviews</h2>
      <div className="row">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id} className="col-md-4 mb-4">
              <div className="review-card p-4 border rounded">
                <h4 className="mb-2">{review.author}</h4>
                <p className="mb-2">{review.content}</p>
                <small className="text-muted">Rating: {review.rating}</small>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
