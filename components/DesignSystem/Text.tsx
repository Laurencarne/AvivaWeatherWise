import {
  TextProps as NativeTextProps,
  Text as NativeText,
  StyleSheet,
} from "react-native";
import { colors } from "./colors";

type TextVariant = "extraLight" | "light" | "reg" | "bold" | "extraBold";
type TextProps = { variant: TextVariant } & NativeTextProps;

export function Text({ variant, ...props }: TextProps) {
  return (
    <NativeText
      maxFontSizeMultiplier={1.3}
      {...props}
      style={[styles[variant], props.style]}
    />
  );
}

const styles = StyleSheet.create({
  extraLight: {
    fontFamily: "extraLight",
    color: colors.primary,
    fontSize: 13,
  },
  light: {
    fontFamily: "light",
    color: colors.primary,
    fontSize: 13,
  },
  reg: {
    fontFamily: "regular",
    color: colors.primary,
    fontSize: 15,
  },
  bold: {
    fontFamily: "bold",
    color: colors.primary,
    fontSize: 17,
  },
  extraBold: {
    fontFamily: "extraBold",
    color: colors.primary,
    fontSize: 17,
  },
});
