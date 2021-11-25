import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { IMovie } from "../type/Movie.type";
import {
  DetailHomeScreenNavigationProp,
  RootStackParamList,
} from "../type/Navigation.type";
import { makeImgPath } from "../utils";
import Poster from "./Poster";

const Container = styled.View`
  flex-direction: row;
  padding: 0px 10px;
`;

const PosterContainer = styled.View``;

const ContentContainer = styled.View`
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: white;
`;

const Date = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.textColor};
`;

const Overview = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.textColor};
`;

const VMovie: React.FC<IMovie> = ({
  poster_path,
  title,
  release_date,
  overview,
  id,
}) => {
  const { width: SCREEN_WIDTH } = Dimensions.get("screen");
  const navigation = useNavigation();
  const onGoDetail = () => {
    navigation.navigate("Stacks", {
      screen: "DetailMovie",
      params: {
        title,
        id,
      },
    });
  };
  return (
    <TouchableOpacity onPress={onGoDetail}>
      <Container>
        <PosterContainer
          style={{
            width: SCREEN_WIDTH / 3,
          }}
        >
          <Poster path={makeImgPath(poster_path)} />
        </PosterContainer>
        <ContentContainer
          style={{
            width: (SCREEN_WIDTH * 1.8) / 3,
          }}
        >
          <Title>{title}</Title>
          <Date>{release_date}</Date>
          <Overview>
            {overview.length > 150 ? overview.slice(0, 150) + "..." : overview}
          </Overview>
        </ContentContainer>
      </Container>
    </TouchableOpacity>
  );
};

export default VMovie;
