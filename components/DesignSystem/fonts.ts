export type FontFamily = keyof typeof fonts;

export const fonts = {
  extraLight: require("./fonts/SourceSans3-ExtraLight.ttf"),
  light: require("./fonts/SourceSans3-Light.ttf"),
  regular: require("./fonts/SourceSans3-Regular.ttf"),
  bold: require("./fonts/SourceSans3-Bold.ttf"),
  extraBold: require("./fonts/SourceSans3-ExtraBold.ttf"),
};
