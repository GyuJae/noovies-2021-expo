import React from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { useAssets } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import Root from "./navigations/Root";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  //const [assets] = useAssets([]);
  const [fontLoading] = Font.useFonts(Ionicons.font);
  const queryClent = new QueryClient();
  if (!fontLoading) {
    return <AppLoading />;
  }
  return (
    <QueryClientProvider client={queryClent}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
