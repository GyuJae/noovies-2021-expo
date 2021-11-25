import React from "react";
import styled from "styled-components/native";
import { View, FlatList } from "react-native";
import HMovie from "./HMovie";
import { ITV } from "../type/TV.type";

const TitleContainer = styled.View`
  padding: 25px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.theme.textColor};
`;

const HTVList: React.FC<{ data?: ITV[]; title: string }> = ({
  data,
  title,
}) => {
  return (
    <>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      <FlatList
        data={data}
        horizontal={true}
        keyExtractor={(item) => item.id + ""}
        ItemSeparatorComponent={() => <View style={{ width: 20 }}></View>}
        renderItem={({ item }) => (
          <HMovie
            path={item.poster_path}
            title={item.name}
            vote={item.vote_average}
            isMovie={false}
          />
        )}
      />
    </>
  );
};

export default HTVList;
