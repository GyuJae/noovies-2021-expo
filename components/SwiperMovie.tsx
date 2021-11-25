import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { IMovie } from "../type/Movie.type";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import Swiper from "react-native-swiper";
import { makeImgPath } from "../utils";
import Poster from "./Poster";

const TrendingContainer = styled.View``;

const BGImg = styled.Image`
  flex: 1;
`;

const SwiperMovieContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.View`
  width: 200px;
  margin-left: 15px;
`;

const MovieTitle = styled.Text`
  font-size: 15px;
  color: white;
`;

const MovieDescription = styled.Text`
  font-size: 12px;
  color: rgba(250, 250, 250, 0.8);
`;

const MovieVoteAvg = styled(MovieDescription)`
  margin: 3px 0px;
`;

const SwiperMovie: React.FC<{ movieData?: IMovie[] }> = ({ movieData }) => {
  const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } =
    Dimensions.get("screen");
  return (
    <TrendingContainer
      style={{
        height: SCREEN_HEIGHT / 4,
      }}
    >
      <Swiper autoplay={true} showsPagination={false} autoplayTimeout={5}>
        {movieData &&
          movieData.map((movie) => (
            <View
              key={movie.id}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BGImg
                style={StyleSheet.absoluteFill}
                source={{
                  uri: makeImgPath(
                    movie.backdrop_path ? movie.backdrop_path : ""
                  ),
                }}
              />
              <BlurView
                tint="dark"
                intensity={80}
                style={StyleSheet.absoluteFill}
              >
                <SwiperMovieContainer>
                  <Poster
                    path={makeImgPath(
                      movie.backdrop_path ? movie.backdrop_path : ""
                    )}
                  />
                  <ContentContainer>
                    <MovieTitle>{movie.title}</MovieTitle>
                    {movie.vote_average !== 0 && (
                      <MovieVoteAvg>❤ {movie.vote_average} / 10</MovieVoteAvg>
                    )}
                    <MovieDescription>
                      {movie.overview && movie.overview.length >= 150
                        ? movie.overview?.slice(0, 150) + "..."
                        : movie.overview}
                    </MovieDescription>
                  </ContentContainer>
                </SwiperMovieContainer>
              </BlurView>
            </View>
          ))}
      </Swiper>
    </TrendingContainer>
  );
};

export default SwiperMovie;
