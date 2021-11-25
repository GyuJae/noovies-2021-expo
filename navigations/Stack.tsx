import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import DetailMovie from "../screens/DetailMovie";
import DetailTV from "../screens/DetailTV";

type RootStackParamList = {
  DetailMovie: undefined;
  DetailTV: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MyStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "black",
      },
      headerTitleAlign: "center",
      headerTintColor: "yellow",
    }}
  >
    <Stack.Screen name="DetailMovie" component={DetailMovie} />
    <Stack.Screen name="DetailTV" options={{}} component={DetailTV} />
  </Stack.Navigator>
);

export default MyStack;
