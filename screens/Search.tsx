import React, { useState } from "react";
import { View, Text } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { movieApis } from "../apis/movie.api";
import { tvApi } from "../apis/tv.api";
import HMovieList from "../components/HMovieList";
import HTVList from "../components/HTVList";
import Loader from "../components/Loader";
import { IMovieResponse } from "../type/Movie.type";
import { ITVResponse } from "../type/TV.type";

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
`;

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const onChangeQuery = (text: string) => setQuery(text);
  const {
    isLoading: movieLoading,
    data: movieData,
    refetch: movieRefetch,
  } = useQuery<IMovieResponse>(["searchMovies", query], movieApis.search, {
    enabled: false,
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: tvRefetch,
  } = useQuery<ITVResponse>(["searchTVs", query], tvApi.search, {
    enabled: false,
  });
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    movieRefetch();
    tvRefetch();
  };
  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV Show"
        placeholderTextColor="grey"
        onChangeText={onChangeQuery}
        onSubmitEditing={onSubmit}
      />
      {movieLoading || tvLoading ? <Loader /> : null}
      {movieData ? <HMovieList title="Movie" data={movieData.results} /> : null}
      {tvData ? <HTVList title="TV" data={tvData.results} /> : null}
    </Container>
  );
};
export default Search;
