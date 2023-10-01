import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Movies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = useCallback(async query => {
    if (query) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=d1dfca7263a34b455ce782b15afff09a&query=${query}`
        );

        if (response.ok) {
          const data = await response.json();
          setSearchResults(data.results);
        } else {
          console.error('Failed to fetch movies:', response.status);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    } else {
      setSearchResults([]);
    }
  }, []);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const queryParam = urlSearchParams.get('search');

    if (queryParam) {
      setSearchQuery(queryParam);
      handleSearch(queryParam);
    }
  }, [location.search, handleSearch]);

  const handleSubmit = e => {
    e.preventDefault();
    navigate(`/movies?search=${searchQuery}`);
  };

  return (
    <div>
      <Link to="/">Go back</Link>
      <h1>Movies</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {searchResults.map(movie => (
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
