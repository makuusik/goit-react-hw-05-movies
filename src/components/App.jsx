import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./Home/Home'));
const Movies = lazy(() => import('./Movies/Movies'));
const MovieDetails = lazy(() => import('./MovieDetails/MovieDetails'));
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));

function App() {
  return (
    <Router>
      <div>
        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="goit-react-hw-05-movies/movies"
                element={<Movies />}
              />
              <Route
                path="goit-react-hw-05-movies/movies/:movieId"
                element={<MovieDetails />}
              />
              <Route
                path="goit-react-hw-05-movies/movies/:movieId/cast"
                element={<Cast />}
              />
              <Route
                path="goit-react-hw-05-movies/movies/:movieId/reviews"
                element={<Reviews />}
              />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;