import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
  Button,
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
  const [movieDetails, setMovieDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [bannerUrl, setBannerUrl] = useState('');
  const [userScore, setUserScore] = useState(null);
  const [genres, setGenres] = useState([]);

  const [isCastVisible, setIsCastVisible] = useState(false);
  const [isReviewsVisible, setIsReviewsVisible] = useState(false);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=d1dfca7263a34b455ce782b15afff09a`
        );
        const data = await response.json();
        setMovieDetails(data);

        // Проверяем, что poster_path не равен null или undefined, прежде чем формировать URL
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

  const handleLoadCast = async () => {
    setIsCastVisible(true);
    setIsReviewsVisible(false);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=d1dfca7263a34b455ce782b15afff09a`
      );
      const data = await response.json();
      setCast(data.cast);
    } catch (error) {
      console.error('Error fetching cast:', error);
    }
  };

  const handleLoadReviews = async () => {
    setIsCastVisible(false);
    setIsReviewsVisible(true);
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
  };

  return (
    <Container>
      <Link to="/">Go back</Link>
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
            <Button onClick={handleLoadCast}>Cast</Button>
            <Button onClick={handleLoadReviews}>Reviews</Button>
          </ButtonContainer>
          {isCastVisible && cast.length > 0 && (
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
          {isReviewsVisible && (
            <ReviewsContainer>
              {isReviewsVisible && (
                <>
                  {reviews.length === 0 ? (
                    <p>There are no reviews for this film yet</p>
                  ) : (
                    <ul>
                      {reviews.map(review => (
                        <Review key={review.id}>
                          <ReviewAuthor>Author: {review.author}</ReviewAuthor>
                          <ReviewContent>
                            Review: {review.content}
                          </ReviewContent>
                        </Review>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </ReviewsContainer>
          )}
        </Info>
      </InfoContainer>
    </Container>
  );
}

export default MovieDetails;