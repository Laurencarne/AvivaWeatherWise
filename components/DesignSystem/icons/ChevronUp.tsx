import React from "react";
import Svg, { Path } from "react-native-svg";

import type { IconProps } from "./types";
import { colors } from "../colors";

const ChevronUp = React.memo(
  ({ color = colors.primary, size = 24, ...props }: IconProps) => (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m7 14.5 5-5 5 5"
      />
    </Svg>
  )
);

export default ChevronUp;
