import { API_KEY } from "@env";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Dispatch, useCallback, useContext, useState } from "react";
import type { Navigation } from "../Navigation/MainStack.types";
import type { FetchResponse, Search } from "../Data/types";
import { baseUrl, searchUrl } from "../api";
import { colors } from "../DesignSystem/colors";
import { icons } from "../DesignSystem/icons/index";
import { Text } from "../DesignSystem/Text";
import { LocationQueryContext } from "../LocationQueryContext";
import haptic from "../DesignSystem/haptics";

export function LocationScreen({ navigation }: { navigation: Navigation }) {
  const [searchResults, setSearchResults] =
    useState<FetchResponse<Search[] | undefined>>();

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <SearchBar setSearchResults={setSearchResults} />
      <ScrollView contentContainerStyle={styles.searchContainer}>
        {searchResults?.state === "loading" ? (
          <Loading />
        ) : searchResults?.state === "error" ? (
          <Error />
        ) : searchResults?.value == null ? (
          <StartSearch />
        ) : searchResults.value.length === 0 ? (
          <Empty />
        ) : (
          searchResults.value.map((result) => (
            <LocationRow
              key={result.id}
              location={result}
              navigation={navigation}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const SearchBar = React.memo(
  ({
    setSearchResults,
  }: {
    setSearchResults: Dispatch<
      React.SetStateAction<FetchResponse<Search[] | undefined> | undefined>
    >;
  }) => {
    const [searchText, setSearchText] = useState("");

    async function fetchLocationData() {
      try {
        setSearchResults({ state: "loading" });
        const response = await fetch(
          `${baseUrl}${searchUrl}?key=${API_KEY}&q=${searchText}`
        );
        if (!response.ok) {
          return setSearchResults({
            state: "error",
            message: "Network response error",
          });
        }
        const json: Search[] = await response.json();
        setSearchResults({ state: "ok", value: json });
      } catch (error) {
        setSearchResults({
          state: "error",
          message: error,
        });
      }
    }

    const onChangeText = useCallback(
      (text: string) => {
        setSearchText(text);
      },
      [setSearchText]
    );

    const submitSearch = useCallback(() => {
      if (searchText.length === 0) return;
      haptic("light");
      fetchLocationData();
    }, [fetchLocationData]);

    return (
      <TextInput
        blurOnSubmit
        returnKeyType="search"
        placeholderTextColor={colors.secondary}
        cursorColor={colors.green}
        selectionColor={colors.blue}
        style={styles.textInput}
        placeholder={"Search..."}
        onChangeText={onChangeText}
        onSubmitEditing={submitSearch}
      />
    );
  }
);

const Header = React.memo(({ navigation }: { navigation: Navigation }) => {
  const goBack = useCallback(() => {
    navigation.goBack();
    haptic("light");
  }, [navigation]);
  return (
    <View style={styles.header}>
      <TouchableOpacity
        hitSlop={{ top: 40, bottom: 40, right: 40, left: 40 }}
        onPress={goBack}
      >
        <icons.cross />
      </TouchableOpacity>
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

const StartSearch = React.memo(() => {
  return (
    <Text variant="bold" style={styles.infoText}>
      🔍{"   "}Enter a location above to start searching...
    </Text>
  );
});

const Empty = React.memo(() => {
  return (
    <Text variant="bold" style={styles.infoText}>
      🙊{"  "}uh-oh no results found, please try another place.
    </Text>
  );
});

const LocationRow = React.memo(
  ({ location, navigation }: { location: Search; navigation: Navigation }) => {
    const updateLocation = useContext(LocationQueryContext).updateLocation;
    const onPress = useCallback(() => {
      updateLocation(location.url);
      navigation.goBack();
      haptic("light");
    }, [updateLocation, location.url, navigation]);

    return (
      <View style={[styles.locationRow, styles.shadowLow]}>
        <View style={styles.locationRowInfo}>
          <Text variant="bold">{location.name}</Text>
          <Text variant="reg">{location.region}</Text>
          <Text variant="reg">{location.country}</Text>
        </View>
        <TouchableOpacity style={styles.locationRowButton} onPress={onPress}>
          <Text variant="bold">Use</Text>
        </TouchableOpacity>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  shadowLow: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
    shadowOpacity: 0.25,
    elevation: 8,
  },
  container: { flex: 1, backgroundColor: colors.blueO },
  header: {
    backgroundColor: colors.yellow,
    padding: 18,
    alignItems: "flex-end",
  },
  textInput: {
    fontSize: 17,
    lineHeight: 19,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 12,
    color: colors.blue,
  },
  searchContainer: { gap: 12, paddingHorizontal: 12, marginTop: 12 },
  infoText: { textAlign: "center", marginTop: 12 },
  locationRow: {
    flex: 1,
    backgroundColor: colors.yellow,
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
  },
  locationRowInfo: { flex: 1, paddingRight: 12 },
  locationRowButton: {
    backgroundColor: colors.green,
    padding: 12,
    borderRadius: 12,
    alignSelf: "center",
  },
});
