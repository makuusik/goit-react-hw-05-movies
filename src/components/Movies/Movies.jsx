import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Movies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchQuery) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=d1dfca7263a34b455ce782b15afff09a&query=${searchQuery}`
        );

        if (response.ok) {
          const data = await response.json();
          setMovies(data.results);

          navigate(`/goit-react-hw-05-movies/movies/?search=${searchQuery}`);
        } else {
          console.error('Failed to fetch movies:', response.status);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    } else {
      setMovies([]);
    }
  };

  return (
    <div>
      <h1>Movies</h1>
      <Link to="/">Go to Home</Link>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/goit-react-hw-05-movies/movies/${movie.id}`}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Movies;
