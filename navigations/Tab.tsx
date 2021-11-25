import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Search from "../screens/Search";
import TV from "../screens/TV";
import { Ionicons } from "@expo/vector-icons";

type BottomRootStackParamList = {
  Moive: undefined;
  TV: undefined;
  Search: undefined;
};

const Tab = createBottomTabNavigator<BottomRootStackParamList>();

const Tabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: "yellow",
      headerStyle: {
        backgroundColor: "black",
      },
      headerTitleAlign: "center",
      headerTintColor: "yellow",
      tabBarStyle: {
        backgroundColor: "black",
        borderTopWidth: 0,
      },
    }}
  >
    <Tab.Screen
      name="Moive"
      component={Movies}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={"film-outline"} color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="TV"
      component={TV}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="tv-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={Search}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={"search-outline"} color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default Tabs;
