import React from "react";
import Svg, { Path } from "react-native-svg";

import type { IconProps } from "./types";
import { colors } from "../colors";

const Rain = React.memo(
  ({ color = colors.primary, size = 24, ...props }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 392.4 392.4" {...props}>
      <Path d="M268.6 96c-18.8-26.4-38-54-52.8-82.8-4-8-12.4-13.2-21.2-13.2-8.8 0-17.2 4.8-21.2 13.2C159 41.6 140.6 68.4 123 94.4c-35.6 51.6-68.8 100-68.8 154 0 83.6 58.8 144 140 144 82 0 144-62 144-144 0-53.6-34-101.6-69.6-152.4zm-74.4 280.4c-72 0-124-54-124-128 0-48.8 32-95.6 65.6-144.8 18-26.4 36.8-54 51.6-83.2 2-4 5.6-4.4 7.2-4.4 1.6 0 5.2.4 7.2 4.4 15.2 29.6 34.8 57.6 54 84.8 34 48.8 66.4 94.8 66.4 143.2 0 72.8-55.2 128-128 128z" />
      <Path d="M156.6 117.6c-3.6-2.4-8.8-1.6-11.2 2-13.6 20.8-29.6 44.8-41.2 69.2-2 4 0 8.8 4 10.8 1.2.4 2.4.8 3.6.8 2.8 0 6-1.6 7.2-4.4 11.2-23.6 26.4-46.8 40-66.8 2.4-4 1.2-8.8-2.4-11.6zM104.6 208.8c-4-1.6-8.8.4-10.4 4.4-1.6 4.4-3.2 8.8-4 13.2-.8 4.4 2 8.4 6.4 9.6h1.6c3.6 0 7.2-2.8 8-6.4.8-3.6 1.6-7.2 3.2-10.8 1.6-3.6-.4-8-4.8-10z" />
    </Svg>
  )
);

export default Rain;
