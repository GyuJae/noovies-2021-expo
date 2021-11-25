import {
  NavigatorScreenParams,
  CompositeNavigationProp,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { StackNavigationProp } from "@react-navigation/stack";

type TabParamList = {
  Home: undefined;
  TV: undefined;
  Search: undefined;
};

type StackParamList = {
  DetailMovie: undefined;
  DetailTV: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<{
    Movies: undefined;
    TV: undefined;
    Search: undefined;
  }>;
  Stacks: NavigatorScreenParams<{
    DetailMovie: { title: string; id: number };
    DetailTV: { title: string; id: number };
  }>;
};

export type DetailHomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, "Home">,
  StackNavigationProp<StackParamList>
>;
