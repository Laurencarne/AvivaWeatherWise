import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "../DesignSystem/Text";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { NavBar, NavBarButton } from "../NavBar";
import type { Navigation } from "../Navigation/MainStack.types";
import type {
  Condition,
  FetchResponse,
  Forecast,
  ForecastDay,
  ForecastDayObject,
  Location,
} from "../Data/types";
import { apiKey, baseUrl, forecastUrl } from "../api";
import { colors } from "../DesignSystem/colors";
import { DateTime } from "luxon";
import { icons } from "../DesignSystem/icons/index";
import { LocationQueryContext } from "../LocationQueryContext";
import haptic from "../DesignSystem/haptics";

export function ForecastScreen({ navigation }: { navigation: Navigation }) {
  const locationQuery = useContext(LocationQueryContext).locationQuery;
  const [weather, setWeather] = useState<FetchResponse<Forecast>>();

  useEffect(() => {
    async function fetchWeatherForecast() {
      try {
        setWeather({ state: "loading" });
        const response = await fetch(
          `${baseUrl}${forecastUrl}?key=${apiKey}&q=${locationQuery}&days=5`
        );
        if (!response.ok) {
          return setWeather({
            state: "error",
            message: "Network response error",
          });
        }
        const json: Forecast = await response.json();
        setWeather({ state: "ok", value: json });
      } catch (error) {
        setWeather({
          state: "error",
          message: error,
        });
      }
    }
    fetchWeatherForecast();
  }, []);

  const goBack = useCallback(() => {
    navigation.goBack();
    haptic("light");
  }, [navigation]);

  return (
    <View style={styles.container}>
      <NavBar
        leftActions={
          <NavBarButton
            action={{
              icon: "chevronLeft",
              onPress: goBack,
            }}
          />
        }
      />
      {weather == null || weather.state === "error" ? (
        <Error />
      ) : weather.state === "loading" ? (
        <Loading />
      ) : (
        <ScrollView style={styles.scrollview}>
          <Location location={weather.value.location.name} />
          {weather.value.forecast.forecastday.map((day) => {
            return <ForecastDay key={day.date} forecast={day} />;
          })}
        </ScrollView>
      )}
    </View>
  );
}

const Location = React.memo(({ location }: { location: string }) => {
  return (
    <View style={styles.locationTitle}>
      <Text variant="bold" style={styles.location}>
        {location}
      </Text>
    </View>
  );
});

const ForecastDay = React.memo(
  ({ forecast }: { forecast: ForecastDayObject }) => {
    return (
      <View>
        <Text variant="bold" style={styles.date}>
          {DateTime.fromISO(forecast.date).toFormat("cccc")}
        </Text>
        <View style={[styles.row, styles.shadowLow]}>
          <View style={styles.tempsContainer}>
            <View style={styles.temps}>
              <icons.chevronUp size={18} />
              <Text variant="reg">{Math.round(forecast.day.maxtemp_c)}°</Text>
            </View>
            <View style={styles.temps}>
              <icons.chevronDown size={18} />
              <Text variant="reg">{Math.round(forecast.day.mintemp_c)}°</Text>
            </View>
          </View>
          <View style={styles.flex}>
            <CurrentWeather condition={forecast.day.condition} />
          </View>
          <View style={styles.rain}>
            <icons.rain size={14} style={styles.rainIcon} />
            <Text variant="reg">{forecast.day.daily_chance_of_rain}%</Text>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text variant="bold">{Math.round(forecast.day.avgtemp_c)}°</Text>
          </View>
        </View>
      </View>
    );
  }
);

const CurrentWeather = React.memo(({ condition }: { condition: Condition }) => {
  return (
    <View>
      <Image
        source={{ uri: `https:${condition.icon}` }}
        style={styles.currentWeatherIcon}
      />
      <Text style={styles.textAlign} variant="light">
        {condition.text}
      </Text>
    </View>
  );
});

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
  container: { flex: 1, backgroundColor: colors.blueO },
  scrollview: { paddingHorizontal: 12 },
  locationTitle: { alignItems: "center", marginVertical: 22 },
  location: { fontSize: 28 },
  date: { marginBottom: 8, fontSize: 18 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    backgroundColor: colors.yellow,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  tempsContainer: { flex: 1, alignItems: "center" },
  temps: { flexDirection: "row", alignItems: "center" },
  currentWeatherIcon: {
    width: 32,
    height: 32,
    alignSelf: "center",
  },
  shadowLow: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
    shadowOpacity: 0.25,
    elevation: 8,
  },
  textAlign: { textAlign: "center" },
  infoText: { textAlign: "center", marginTop: 12 },
  rain: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  rainIcon: { marginRight: 3 },
});
