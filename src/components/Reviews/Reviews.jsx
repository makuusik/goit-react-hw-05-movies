import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchMovieReviews() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=d1dfca7263a34b455ce782b15afff09a`
        );
        const data = await response.json();
        setReviews(data.results);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p>Author: {review.author}</p>
            <p>Review: {review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reviews;
