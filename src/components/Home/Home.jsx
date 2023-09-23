import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=d1dfca7263a34b455ce782b15afff09a`
        );
        const data = await response.json();
        setTrendingMovies(data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    }

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {}
      <Link to="/movies">
        <button>Explore Movies</button>
      </Link>
      <ul>
        {trendingMovies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
