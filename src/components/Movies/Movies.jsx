import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Movies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = async () => {
    if (searchQuery) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=d1dfca7263a34b455ce782b15afff09a&query=${searchQuery}`
        );

        if (response.ok) {
          const data = await response.json();
          setMovies(data.results);
          navigate(`/movies?search=${searchQuery}`);
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

  const goBack = () => {
    if (location.pathname.startsWith('/')) {
      navigate(`/`);
    } else {
      navigate('/');
    }
  };

  return (
    <div>
      <h1>Movies</h1>
      {}
      <button onClick={goBack}>Go back</button>
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
            <Link
              to={`/movies/${movie.id}`}
              state={{ fromSearch: searchQuery }}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Movies;
