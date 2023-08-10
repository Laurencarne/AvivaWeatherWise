import {
  Image,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { Text } from "../DesignSystem/Text";
import React, { useCallback, useContext, useEffect, useState } from "react";
import type { Navigation } from "../Navigation/MainStack.types";
import { NavBar, NavBarButton } from "../NavBar";
import { colors } from "../DesignSystem/colors";
import { icons } from "../DesignSystem/icons/index";
import { getTimestamp, getUVIndex } from "../helpers";
import {
  type Weather,
  type CurrentWeather,
  type Location,
  type Astonomy,
  type Astro,
  FetchResponse,
} from "../Data/types";
import { astonomyUrl, baseUrl, currentUrl } from "../api";
import { LocationQueryContext } from "../LocationQueryContext";
import haptic from "../DesignSystem/haptics";
import { API_KEY } from "@env";

const icon = require("../../assets/InvertedLogo.png");

export function HomeScreen({ navigation }: { navigation: Navigation }) {
  const locationQuery = useContext(LocationQueryContext).locationQuery;
  const [weather, setWeather] = useState<FetchResponse<CurrentWeather>>();
  useEffect(() => {
    async function fetchWeatherData() {
      try {
        setWeather({ state: "loading" });
        const response = await fetch(
          `${baseUrl}${currentUrl}?key=${API_KEY}&q=${locationQuery}`
        );
        if (!response.ok) {
          return setWeather({
            state: "error",
            message: "Network response error",
          });
        }
        const json: CurrentWeather = await response.json();
        setWeather({ state: "ok", value: json });
      } catch (error) {
        setWeather({ state: "error", message: error });
      }
    }
    fetchWeatherData();
  }, [locationQuery]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.blueO }}>
      <HomeScreenNavBar navigation={navigation} />
      <ScrollView>
        {weather == null || weather.state === "error" ? (
          <Error />
        ) : weather.state === "loading" ? (
          <Loading />
        ) : (
          <>
            <Location location={weather.value.location.name} />
            <CurrentWeather weather={weather.value.current} />
            <WeatherSummary weather={weather.value.current} />
            <AstroSummary locationQuery={locationQuery} />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const HomeScreenNavBar = React.memo(
  ({ navigation }: { navigation: Navigation }) => {
    const onForecastPress = useCallback(() => {
      navigation.navigate("ForecastScreen");
      haptic("light");
    }, [navigation]);

    const onLocationPress = useCallback(() => {
      navigation.navigate("LocationScreen");
      haptic("light");
    }, [navigation]);

    return (
      <NavBar
        leftActions={<Image source={icon} style={styles.navBarIcon} />}
        rightActions={
          <>
            <NavBarButton
              action={{
                label: "Forecast",
                onPress: onForecastPress,
              }}
            />
            <NavBarButton
              action={{
                label: "Location",
                onPress: onLocationPress,
              }}
            />
          </>
        }
      />
    );
  }
);

const Location = React.memo(({ location }: { location: string }) => {
  return (
    <View style={{ alignItems: "center", marginTop: 22 }}>
      <Text variant="bold" style={{ fontSize: 28 }}>
        {location}
      </Text>
    </View>
  );
});

const CurrentWeather = React.memo(({ weather }: { weather: Weather }) => {
  const { condition, temp_c } = weather;
  return (
    <View style={styles.currentWeatherContainer}>
      <View style={styles.currentWeatherWrapper}>
        <Image
          source={{ uri: `https:${condition.icon}` }}
          style={styles.currentWeatherIcon}
        />
        <Text variant="extraBold" style={styles.currentWeatherTemp}>
          {Math.round(temp_c).toString() + "°"}
        </Text>
      </View>
      <Text variant="bold">{condition.text}</Text>
    </View>
  );
});

const WeatherSummary = React.memo(({ weather }: { weather: Weather }) => {
  return (
    <View style={styles.weatherContainer}>
      <Text variant="extraBold" style={styles.tableTitle}>
        Current Conditions
      </Text>
      <View style={[styles.tableContainer, styles.shadowLow]}>
        <Row
          title={"RealFeel"}
          description={Math.round(weather.feelslike_c).toString() + "°"}
        />
        <Row
          title={"Wind"}
          description={`${weather.wind_dir ?? ""} ${weather.wind_kph} km/h`}
        />
        <Row
          title={"Max Wind Gusts"}
          description={`${weather.gust_kph} km/h`}
        />
        <Row title={"UV Index"} description={`${getUVIndex(weather.uv)}`} />
        <Row title={"Humidity"} description={`${weather.humidity}%`} />
        <Row
          title={"Visibility"}
          description={`${weather.vis_km} km`}
          style={{ borderBottomWidth: 0 }}
        />
      </View>
    </View>
  );
});

const Row = React.memo(
  ({
    title,
    description,
    style,
  }: {
    title: string;
    description: string;
    style?: StyleProp<ViewStyle>;
  }) => {
    return (
      <View style={[styles.row, style]}>
        <Text variant="reg">{title}</Text>
        <Text variant="bold">{description}</Text>
      </View>
    );
  }
);

const AstroSummary = React.memo(
  ({ locationQuery }: { locationQuery: string }) => {
    const [astro, setAstro] = useState<FetchResponse<Astro>>();

    useEffect(() => {
      async function fetchAstroData() {
        try {
          setAstro({ state: "loading" });
          const response = await fetch(
            `${baseUrl}${astonomyUrl}?key=${API_KEY}&q=${locationQuery}`
          );
          if (!response.ok) {
            return setAstro({
              state: "error",
              message: "Network response error",
            });
          }
          const json: Astonomy = await response.json();
          setAstro({ state: "ok", value: json.astronomy.astro });
        } catch (error) {
          setAstro({ state: "error", message: error });
        }
      }
      fetchAstroData();
    }, []);

    if (astro == null || astro.state === "error") return null;

    return (
      <View style={styles.astroContainer}>
        <Text variant="extraBold" style={styles.tableTitle}>
          Sun & Moon
        </Text>
        <View
          style={[styles.tableContainer, styles.astroTable, styles.shadowLow]}
        >
          {astro.state === "loading" ? (
            <Loading />
          ) : (
            <>
              <View style={styles.astroTableLeft}>
                <View style={styles.astroTableLeftText}>
                  <View style={styles.astroIcon}>
                    <icons.sun />
                  </View>
                  <View style={[styles.astroText, styles.astroTextTop]}>
                    <Text variant="reg">Rise</Text>
                    <Text variant="reg">
                      {getTimestamp(astro.value.sunrise)}
                    </Text>
                  </View>
                  <View style={styles.astroText}>
                    <Text variant="reg">Set</Text>
                    <Text variant="reg">
                      {getTimestamp(astro.value.sunset)}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.flex}>
                <View style={styles.astroTableRightText}>
                  <View style={styles.astroIcon}>
                    <icons.moon />
                  </View>
                  <View style={[styles.astroText, styles.astroTextTop]}>
                    <Text variant="reg">Rise</Text>
                    <Text variant="reg">
                      {getTimestamp(astro.value.moonrise)}
                    </Text>
                  </View>
                  <View style={styles.astroText}>
                    <Text variant="reg">Set</Text>
                    <Text variant="reg">
                      {getTimestamp(astro.value.moonset)}
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    );
  }
);

const Loading = React.memo(() => {
  return (
    <Text variant="bold" style={styles.infoText}>
      👀{"  "}loading...
    </Text>
  );
});

const Error = React.memo(() => {
  return (
    <Text variant="bold" style={styles.infoText}>
      🙊{"  "}uh-oh no something went wrong, please try again.
    </Text>
  );
});

const styles = StyleSheet.create({
  flex: { flex: 1 },
  navBarIcon: { marginLeft: 12, width: 44, height: 44 },

  shadowLow: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
    shadowOpacity: 0.25,
    elevation: 8,
  },
  // CURRENT WEATHER
  currentWeatherContainer: {
    paddingHorizontal: 44,
    marginBottom: 44,
    alignItems: "center",
  },
  currentWeatherIcon: { width: 62, height: 62 },
  currentWeatherTemp: { fontSize: 22 },
  currentWeatherWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  // WEATHER SUMMARY
  weatherContainer: { marginHorizontal: 16 },
  row: {
    flexDirection: "row",
    height: 46,
    justifyContent: "space-between",
    borderBottomColor: colors.green,
    borderBottomWidth: 1,
    alignItems: "center",
  },
  // ASTRO
  astroContainer: { marginHorizontal: 16, marginTop: 20 },
  astroTable: { flexDirection: "row" },
  astroTableLeft: { flex: 1, borderRightWidth: 1, borderColor: colors.green },
  astroTableLeftText: { marginRight: 10 },
  astroIcon: { alignItems: "center", paddingVertical: 8 },
  astroText: {
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  astroTextTop: { borderBottomColor: colors.green, borderBottomWidth: 1 },
  astroTableRightText: { marginLeft: 10 },
  // SHARED
  tableTitle: { marginLeft: 4 },
  tableContainer: {
    backgroundColor: colors.yellow,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 6,
  },
  // ERROR LOADING
  infoText: { textAlign: "center", marginTop: 12 },
});
