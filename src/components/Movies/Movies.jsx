import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

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
    if (location.state && location.state.searchQuery) {
      const { searchQuery: stateSearchQuery } = location.state;
      setSearchQuery(stateSearchQuery);
      handleSearch(stateSearchQuery);
    }
  }, [location.state, handleSearch]);

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

    handleSearch(searchQuery);
  };

  const goBack = () => {
    if (location.state && location.state.fromSearch) {
      navigate(`/movies?search=${location.state.fromSearch}`);
    } else if (location.state && location.state.movieId) {
      navigate(`/movies/${location.state.movieId}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div>
      <h1>Movies</h1>
      <button onClick={goBack}>Go back</button>
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
