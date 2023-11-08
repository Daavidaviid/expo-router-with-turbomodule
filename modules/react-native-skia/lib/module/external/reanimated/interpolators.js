import { useMemo } from "react";
import { interpolatePaths, interpolateVector } from "../../animation";
import { Skia } from "../../skia";
import { useAnimatedReaction, useFrameCallback, useSharedValue } from "./moduleWrapper";
export const notifyChange = value => {
  "worklet"; // eslint-disable-next-line @typescript-eslint/no-explicit-any

  value._value = value.value;
};
export const useClock = () => {
  const clock = useSharedValue(0);
  useFrameCallback(info => {
    clock.value = info.timeSinceFirstFrame;
  });
  return clock;
};
/**
 * @worklet
 */

const useInterpolator = (factory, value, interpolator, input, output, options) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const init = useMemo(() => factory(), []);
  const result = useSharedValue(init);
  useAnimatedReaction(() => value.value, val => {
    result.value = interpolator(val, input, output, options, result.value);
    notifyChange(result);
  }, [input, output, options]);
  return result;
};

export const usePathInterpolation = (value, input, outputRange, options) => useInterpolator(() => Skia.Path.Make(), value, interpolatePaths, input, outputRange, options);
export const useVectorInterpolation = (value, input, outputRange, options) => useInterpolator(() => Skia.Point(0, 0), value, interpolateVector, input, outputRange, options);
//# sourceMappingURL=interpolators.js.map