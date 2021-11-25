import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components/native";
import { tvApi } from "../apis/tv.api";
import HMovie from "../components/HMovie";
import Loader from "../components/Loader";
import { RootStackParamList } from "../type/Navigation.type";
import { ITVResponse } from "../type/TV.type";
import { ScrollView } from "react-native-gesture-handler";
import HTVList from "../components/HTVList";

const Wrapper = styled.View`
  background-color: ${(props) => props.theme.mainBgColor};
  flex: 1;
`;

const TitleContainer = styled.View`
  padding: 25px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.theme.textColor};
`;

const TV: React.FC<NativeStackScreenProps<RootStackParamList, "Tabs">> = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { isLoading: isTrendingLoading, data: trendingData } =
    useQuery<ITVResponse>(["tvs", "trending"], tvApi.trending);
  const { isLoading: isAiringTodayLoading, data: airingTodayData } =
    useQuery<ITVResponse>(["tvs", "airingToday"], tvApi.airingToday);
  const { isLoading: isTopRatedLoading, data: topRatedData } =
    useQuery<ITVResponse>(["tvs", "topRated"], tvApi.topRated);

  const loading =
    isTrendingLoading || isAiringTodayLoading || isTopRatedLoading;
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tvs"]);
    setRefreshing(false);
  };

  return (
    <Wrapper>
      {loading ? (
        Loader
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <HTVList data={trendingData?.results} title="Trending" />
          <HTVList data={airingTodayData?.results} title="Airing Today" />
          <HTVList data={topRatedData?.results} title="Top Rated" />
        </ScrollView>
      )}
    </Wrapper>
  );
};
export default TV;
