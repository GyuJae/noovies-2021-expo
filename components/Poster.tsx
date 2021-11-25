import React from "react";
import styled from "styled-components/native";

const PosterContainer = styled.Image`
  height: 190px;
  width: 120px;
  border-radius: 5px;
`;

const Poster: React.FC<{ path: string }> = ({ path }) => {
  return (
    <PosterContainer
      source={{
        uri: path,
      }}
    />
  );
};

export default Poster;
