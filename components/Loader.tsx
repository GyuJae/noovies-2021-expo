import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <ActivityIndicator color="white" size="large" />
    </LoaderContainer>
  );
};

export default Loader;
