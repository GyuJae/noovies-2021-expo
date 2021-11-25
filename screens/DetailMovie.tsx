import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { movieApis } from "../apis/movie.api";
import Loader from "../components/Loader";
import { IMovieDetail, IMovieImages } from "../type/Movie.type";
import { RootStackParamList } from "../type/Navigation.type";
import { makeImgPath } from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import Poster from "../components/Poster";
import Swiper from "react-native-swiper";
import { FlatList } from "react-native-gesture-handler";

const Wrapper = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BGImage = styled.Image``;

const PosterContainer = styled.View`
  margin: 10px auto;
  width: 95%;
`;

const ContentContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding: 20px 0px;
  width: 95%;
  margin: 0px auto;
`;

const Title = styled.Text`
  font-size: 25px;
  color: white;
  font-weight: 700;
  margin-bottom: 8px;
`;

const Overview = styled.Text`
  font-size: 15px;
  color: ${(props) => props.theme.textColor};
`;

const GenreColumn = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const GenreContainer = styled.View`
  padding: 5px;
  background-color: rgba(250, 250, 250, 0.2);
  margin: 3px;
  border-radius: 5px;
`;

const Genre = styled.Text`
  font-size: 15px;
  color: ${(props) => props.theme.textColor};
`;

const SubColumn = styled.View`
  flex-direction: row;
  width: 95%;
  padding: 5px 0px;
`;

const Date = styled.Text`
  font-size: 15px;
  color: ${(props) => props.theme.textColor};
`;

const LogoContainer = styled.View`
  background-color: rgba(250, 250, 250, 0.1);
  height: 180px;
  padding: 10px;
  margin-top: 20px;
`;

const LogoImg = styled.Image`
  height: 150px;
`;

const DetailMovie: React.FC<
  NativeStackScreenProps<RootStackParamList, "Stacks">
> = ({ route: { params }, navigation: { setOptions } }) => {
  //@ts-ignore
  const { isLoading, data } = useQuery<IMovieDetail>(
    ["movie", params.id],
    movieApis.detail
  );
  const { isLoading: imagesLoading, data: imagesData } = useQuery<IMovieImages>(
    ["movieImg", params.id],
    movieApis.images
  );
  const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } =
    Dimensions.get("screen");
  useEffect(() => {
    setOptions({
      //@ts-ignore
      title: params?.title ? params.title : "Movie",
    });
  }, []);
  return (
    <Wrapper>
      {isLoading || imagesLoading ? (
        <Container>
          <Loader />
        </Container>
      ) : (
        <Container>
          <Header
            style={{
              height: SCREEN_HEIGHT / 4,
            }}
          >
            <Swiper showsPagination={false} autoplay={true}>
              {imagesData &&
                imagesData?.backdrops.map((back, index) => (
                  <BGImage
                    key={index}
                    style={StyleSheet.absoluteFill}
                    source={{ uri: makeImgPath(back.file_path) }}
                  />
                ))}
            </Swiper>
          </Header>
          <ContentContainer>
            <Title numberOfLines={1}>{data?.original_title}</Title>
            <GenreColumn
              style={{
                width: SCREEN_WIDTH,
              }}
            >
              {data?.genres.map((genre) => (
                <GenreContainer key={genre.id}>
                  <Genre>{genre.name}</Genre>
                </GenreContainer>
              ))}
            </GenreColumn>
            <SubColumn>
              <Date>{data?.release_date}</Date>
            </SubColumn>

            <Overview>{data?.overview}</Overview>
          </ContentContainer>
          <PosterContainer>
            {imagesData && (
              <FlatList
                data={imagesData?.posters}
                renderItem={({ item }) => (
                  <Poster path={makeImgPath(item.file_path)} />
                )}
                keyExtractor={(item) => item.file_path}
                horizontal={true}
                ItemSeparatorComponent={() => (
                  <View style={{ width: 20 }}></View>
                )}
              />
            )}
          </PosterContainer>
          <LogoContainer>
            <Swiper showsPagination={false} autoplay={true} height={220}>
              {data?.production_companies.map((company) => (
                <LogoImg
                  key={company.id}
                  source={{ uri: makeImgPath(company.logo_path) }}
                  style={{
                    resizeMode: "contain",
                    width: SCREEN_WIDTH,
                  }}
                />
              ))}
            </Swiper>
          </LogoContainer>
        </Container>
      )}
    </Wrapper>
  );
};

export default DetailMovie;
