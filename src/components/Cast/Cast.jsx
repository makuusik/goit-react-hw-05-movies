import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function fetchMovieCast() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=d1dfca7263a34b455ce782b15afff09a`
        );
        const data = await response.json();
        setCast(data.cast);
      } catch (error) {
        console.error('Error fetching cast:', error);
      }
    }

    fetchMovieCast();
  }, [movieId]);

  return (
    <div>
      <ul>
        {cast.map(actor => (
          <li key={actor.id}>
            {actor.name} as {actor.character}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cast;
