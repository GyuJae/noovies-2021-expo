import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyStack from "./Stack";
import Tabs from "./Tab";
import { RootStackParamList } from "../type/Navigation.type";

const Nav = createNativeStackNavigator<RootStackParamList>();

const Root = () => (
  <Nav.Navigator screenOptions={{ presentation: "modal", headerShown: false }}>
    <Nav.Screen name="Tabs" component={Tabs} />
    <Nav.Screen name="Stacks" component={MyStack} />
  </Nav.Navigator>
);

export default Root;
