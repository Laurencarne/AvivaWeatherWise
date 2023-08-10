import React from "react";
import Svg, { Path } from "react-native-svg";

import type { IconProps } from "./types";
import { colors } from "../colors";

const ChevronLeft = React.memo(
  ({ color = colors.primary, size = 32, ...props }: IconProps) => (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        stroke={color}
        strokeWidth={0.6}
        fill={color}
        fillRule="evenodd"
        d="m10.06 12 5.47 5.47-1.06 1.06L7.94 12l6.53-6.53 1.06 1.06L10.06 12Z"
        clipRule="evenodd"
      />
    </Svg>
  )
);

export default ChevronLeft;
