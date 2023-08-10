import { useFonts } from "expo-font";
import React from "react";

import { fonts } from "./fonts";

export function FontsProvider({ children }: { children: React.ReactNode }) {
  const [loaded, error] = useFonts(fonts);
  if (!loaded) {
    if (error != null) throw error;
    return null;
  }
  return <>{children}</>;
}
