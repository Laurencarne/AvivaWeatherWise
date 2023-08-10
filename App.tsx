import { FontsProvider } from "./components/DesignSystem/FontsProvider";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import MainStack from "./components/Navigation/MainStack";
import { colors } from "./components/DesignSystem/colors";
import { LocationQueryContextProvider } from "./components/LocationQueryContext";

export default function App() {
  return (
    <View style={styles.flex}>
      <FontsProvider>
        <NavigationContainer>
          <LocationQueryContextProvider>
            <MainStack />
          </LocationQueryContextProvider>
          <StatusBar style="auto" />
        </NavigationContainer>
      </FontsProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.blueO },
});
