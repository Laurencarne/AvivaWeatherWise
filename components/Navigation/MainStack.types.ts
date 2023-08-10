import type { NavigationContainerRef } from "@react-navigation/native";

export type Navigation = Pick<
  NavigationContainerRef<MainStackParams>,
  "navigate" | "goBack" | "canGoBack" | "reset" | "resetRoot"
>;

export type MainStackParams = {
  HomeScreen: undefined;
  ForecastScreen: undefined;
  LocationScreen: undefined;
};
