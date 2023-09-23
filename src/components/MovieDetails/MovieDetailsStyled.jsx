import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 20px;
`;

export const Poster = styled.img`
  width: 300px;
  height: auto;
  object-fit: cover;
`;

export const Info = styled.div`
  margin-left: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  margin-bottom: 10px;
`;

export const Overview = styled.p`
  font-size: 16px;
  margin: 0;
`;

export const UserScore = styled.p`
  font-size: 16px;
  margin: 0;
  margin-bottom: 10px;
`;

export const Genres = styled.p`
  font-size: 16px;
  margin: 0;
  margin-bottom: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const Button = styled.button`
  padding: 5px 10px;
  background-color: #0075db;
  color: #fff;
  border: none;
  cursor: pointer;
`;

export const CastContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
`;

export const Actor = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  margin-bottom: 20px;
`;

export const ActorImage = styled.img`
  width: 100px;
  height: auto;
  object-fit: cover;
`;

export const ActorInfo = styled.div`
  margin-left: 10px;
`;

export const ActorName = styled.p`
  font-size: 16px;
  margin: 0;
`;

export const ActorCharacter = styled.p`
  font-size: 14px;
  margin: 0;
  margin-top: 5px;
`;

export const ReviewsContainer = styled.div`
  margin-top: 20px;
`;

export const Review = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
`;

export const ReviewAuthor = styled.p`
  font-size: 16px;
  margin: 0;
`;

export const ReviewContent = styled.p`
  font-size: 14px;
  margin: 0;
  margin-top: 10px;
`;
