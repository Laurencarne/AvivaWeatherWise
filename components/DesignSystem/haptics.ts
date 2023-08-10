import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

type ImpactHaptic = "light" | "medium" | "heavy";

export default async function haptic(impact: ImpactHaptic) {
  // Android haptics are rather aggresive. Always use the lightest option.
  if (Platform.OS === "android") {
    return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }

  if (impact === "light") {
    return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } else if (impact === "medium") {
    return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  } else if (impact === "heavy") {
    return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }
}
