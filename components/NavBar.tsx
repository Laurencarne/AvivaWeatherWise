import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, icons } from "./DesignSystem/icons";
import { Text } from "./DesignSystem/Text";
import { colors } from "./DesignSystem/colors";
import {
  EdgeInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";

const safeArea: EdgeInsets = initialWindowMetrics?.insets ?? {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

const navBarHeight = 52 + safeArea.top;

type NavBarAction = NavBarIconAction | NavBarTextAction;
type NavBarIconAction = { icon: Icon; onPress: () => void };
type NavBarTextAction = { label: string; onPress: () => void };

/**
 * Renders a nav bar with optional left/right icons.
 */
export function NavBar({
  leftActions,
  rightActions,
}: {
  leftActions?: React.ReactNode;
  rightActions?: React.ReactNode;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.leftActions}>{leftActions}</View>
      <View style={styles.rightActions}>{rightActions}</View>
    </View>
  );
}

export function NavBarButton({ action }: { action: NavBarAction }) {
  if ("icon" in action) {
    const IconComponent = icons[action.icon];
    return (
      <TouchableOpacity onPress={action.onPress} style={styles.buttonContainer}>
        <IconComponent color={colors.blue} />
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={action.onPress} style={styles.buttonContainer}>
        <Text variant="reg">{action.label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: navBarHeight,
    backgroundColor: colors.yellow,
    paddingTop: safeArea.top,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  leftActions: {
    alignItems: "center",
    flexDirection: "row",
  },
  rightActions: {
    alignItems: "center",
    flexDirection: "row",
  },
  buttonContainer: { padding: 12 },
});
