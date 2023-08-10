import React from "react";
import Svg, { Path, G, Circle } from "react-native-svg";

import type { IconProps } from "./types";
import { colors } from "../colors";

const Sun = React.memo(
  ({ color = colors.primary, size = 24, ...props }: IconProps) => (
    <Svg
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
      {...props}
    >
      <G stroke={color} strokeWidth={1.5}>
        <Circle cx={12} cy={12} r={5} />
        <Path strokeLinecap="round" d="M12 2v2M12 20v2M4 12H2M22 12h-2" />
        <Path
          strokeLinecap="round"
          d="m19.778 4.223-2.222 2.031M4.222 4.223l2.222 2.031M6.444 17.556l-2.222 2.222M19.778 19.777l-2.222-2.222"
        />
      </G>
    </Svg>
  )
);

export default Sun;
