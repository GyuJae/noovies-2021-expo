import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components/native";
import { movieApis } from "../apis/movie.api";
import HMovie from "../components/HMovie";
import Loader from "../components/Loader";
import Poster from "../components/Poster";
import SwiperMovie from "../components/SwiperMovie";
import VMovie from "../components/VMovie";
import { IMovieResponse } from "../type/Movie.type";
import { RootStackParamList } from "../type/Navigation.type";
import { makeImgPath } from "../utils";

const MovieView = styled.View`
  background-color: ${(props) => props.theme.mainBgColor};
  flex: 1;
`;

const TitleContainer = styled.View`
  padding: 15px 10px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.theme.textColor};
`;

const Movies: React.FC<NativeStackScreenProps<RootStackParamList, "Tabs">> = ({
  navigation: { navigate },
}) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { isLoading: trendingLoading, data: trendingData } =
    useQuery<IMovieResponse>(["movies", "trending"], movieApis.trending);
  const { isLoading: nowPlayingLoading, data: nowPlayingData } =
    useQuery<IMovieResponse>(["movies", "nowPlaying"], movieApis.nowPlaying);
  const { isLoading: upcomingLoading, data: upcomingData } =
    useQuery<IMovieResponse>(["movies", "upcoming"], movieApis.upcoming);
  const loading = trendingLoading || nowPlayingLoading || upcomingLoading;
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };
  return (
    <MovieView>
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          onRefresh={onRefresh}
          refreshing={refreshing}
          ListHeaderComponent={
            <>
              <SwiperMovie movieData={trendingData?.results} />
              <TitleContainer>
                <Title>Now Playing</Title>
              </TitleContainer>
              <FlatList
                horizontal={true}
                data={nowPlayingData?.results}
                keyExtractor={(item) => item.id + ""}
                ItemSeparatorComponent={() => (
                  <View style={{ width: 20 }}></View>
                )}
                renderItem={({ item }) => (
                  <HMovie
                    key={item.id}
                    dataId={item.id}
                    path={item.poster_path}
                    title={item.title}
                    vote={item.vote_average}
                    isMovie={true}
                  />
                )}
              />
              <TitleContainer>
                <Title>Upcoming</Title>
              </TitleContainer>
            </>
          }
          data={upcomingData?.results}
          keyExtractor={(item) => item.id + ""}
          renderItem={({ item }) => <VMovie {...item} />}
          ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
        />
      )}
    </MovieView>
  );
};
export default Movies;
