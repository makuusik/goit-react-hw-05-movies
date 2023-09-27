import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  InfoContainer,
  Poster,
  Info,
  Title,
  Overview,
  UserScore,
  Genres,
  ButtonContainer,
  CastContainer,
  Actor,
  ActorImage,
  ActorInfo,
  ActorName,
  ActorCharacter,
  ReviewsContainer,
  Review,
  ReviewAuthor,
  ReviewContent,
} from './MovieDetailsStyled';

function MovieDetails() {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const navigateBack = () => {
    if (location.state && location.state.fromSearch) {
      navigate(`/movies?search=${location.state.fromSearch}`);
    } else {
      navigate('/');
    }
  };

  const [movieDetails, setMovieDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [bannerUrl, setBannerUrl] = useState('');
  const [userScore, setUserScore] = useState(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=d1dfca7263a34b455ce782b15afff09a`
        );
        const data = await response.json();
        setMovieDetails(data);

        const bannerUrl = data.poster_path
          ? `https://image.tmdb.org/t/p/w400${data.poster_path}`
          : '';

        setBannerUrl(bannerUrl);
        setUserScore(data.vote_average);
        setGenres(data.genres);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    }

    fetchMovieDetails();
  }, [movieId]);

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

    async function fetchMovieReviews() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=d1dfca7263a34b455ce782b15afff09a&language=en-US&page=1`
        );
        if (response.ok) {
          const data = await response.json();
          setReviews(data.results);
        } else {
          console.error('Failed to fetch reviews:', response.status);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }

    if (location.pathname.endsWith('/cast')) {
      fetchMovieCast();
    } else if (location.pathname.endsWith('/reviews')) {
      fetchMovieReviews();
    }
  }, [movieId, location.pathname]);

  return (
    <Container>
      <button onClick={navigateBack}>Go back</button>
      <InfoContainer>
        <Poster src={bannerUrl} alt={movieDetails.title} />
        <Info>
          <Title>{movieDetails.title}</Title>
          {userScore !== null && <UserScore>User score: {userScore}</UserScore>}
          {genres.length > 0 && (
            <Genres>
              Genres: {genres.map(genre => genre.name).join(', ')}
            </Genres>
          )}
          <Overview>Overview: {movieDetails.overview}</Overview>
          <ButtonContainer>
            <Link to={`/movies/${movieId}/cast`}>Cast</Link>
            <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
          </ButtonContainer>
          {location.pathname.endsWith('/cast') && cast.length > 0 && (
            <CastContainer>
              {cast.map(actor => (
                <Actor key={actor.id}>
                  {actor.profile_path ? (
                    <ActorImage
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                    />
                  ) : (
                    <div>No image available</div>
                  )}
                  <ActorInfo>
                    <ActorName>{actor.name}</ActorName>
                    {actor.character && (
                      <ActorCharacter>as {actor.character}</ActorCharacter>
                    )}
                  </ActorInfo>
                </Actor>
              ))}
            </CastContainer>
          )}
          {location.pathname.endsWith('/reviews') && (
            <ReviewsContainer>
              {reviews.length === 0 ? (
                <p>There are no reviews for this film yet</p>
              ) : (
                <ul>
                  {reviews.map(review => (
                    <Review key={review.id}>
                      <ReviewAuthor>Author: {review.author}</ReviewAuthor>
                      <ReviewContent>Review: {review.content}</ReviewContent>
                    </Review>
                  ))}
                </ul>
              )}
            </ReviewsContainer>
          )}
        </Info>
      </InfoContainer>
    </Container>
  );
}

export default MovieDetails;
