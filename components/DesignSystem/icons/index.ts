import chevronDown from "./ChevronDown";
import chevronLeft from "./ChevronLeft";
import chevronUp from "./ChevronUp";
import cross from "./Cross";
import moon from "./Moon";
import rain from "./Rain";
import sun from "./Sun";

export type Icon = keyof typeof icons;

export const icons = {
  chevronDown,
  chevronLeft,
  chevronUp,
  cross,
  moon,
  rain,
  sun,
};
