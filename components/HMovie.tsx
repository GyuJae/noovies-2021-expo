import { useNavigation } from "@react-navigation/core";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import Poster from "./Poster";

const Container = styled.View`
  width: 130px;
  height: 250px;
  align-items: center;
`;

const ContentContainer = styled.View`
  margin-top: 5px;
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-size: 13px;
  font-weight: 600;
`;

const VOTE = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 11px;
`;

const HMovie: React.FC<{
  path: string | null;
  title: string;
  vote: number;
  isMovie: boolean;
  dataId: number;
}> = ({ path, title, vote, isMovie, dataId }) => {
  const navigation = useNavigation();
  const onGoDetail = () => {
    navigation.navigate("Stacks", {
      screen: isMovie ? "DetailMovie" : "DetailTV",
      params: {
        title,
        id: dataId,
      },
    });
  };
  return (
    <TouchableOpacity onPress={onGoDetail}>
      <Container>
        <Poster path={makeImgPath(path)} />
        <ContentContainer>
          <Title>
            {title && title.length > 15 ? title.slice(0, 15) + "..." : title}
          </Title>
          <VOTE>{vote ? `❤ ${vote} / 10` : null}</VOTE>
        </ContentContainer>
      </Container>
    </TouchableOpacity>
  );
};

export default HMovie;
