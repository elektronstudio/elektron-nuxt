import { useBreakpoints } from "@vueuse/core";

export const breakpoints = useBreakpoints({
  medium: 600,
  large: 900,
  xlarge: 1440,
});

// export const _useBreakpoints

export const mobile = breakpoints.smaller("large");
export const desktop = breakpoints.greater("large");
