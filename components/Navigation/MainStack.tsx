// In App.js in a new project

import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ForecastScreen } from "../ForecastScreen/ForecastScreen";
import { HomeScreen } from "../HomeScreen/HomeScreen";
import { MainStackParams } from "./MainStack.types";
import { LocationScreen } from "../LocationScreen/LocationScreen";

const Stack = createNativeStackNavigator<MainStackParams>();

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForecastScreen"
        component={ForecastScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LocationScreen"
        component={LocationScreen}
        options={{ headerShown: false, presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
