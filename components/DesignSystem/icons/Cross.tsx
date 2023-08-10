import React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

import type { IconProps } from "./types";
import { colors } from "../colors";

const Cross = React.memo(
  ({ color = colors.primary, size = 24, ...props }: IconProps) => (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24" {...props}>
      <G clipPath="url(#prefix__clip0_5061_77320)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.132 5.99a1.5 1.5 0 10-2.122-2.122L12 9.878l-6.01-6.01A1.5 1.5 0 103.868 5.99L9.878 12l-6.01 6.01a1.5 1.5 0 002.122 2.122l6.01-6.01 6.01 6.01a1.5 1.5 0 002.122-2.122L14.122 12l6.01-6.01z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0_5061_77320">
          <Path fill={color} d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
);

export default Cross;
