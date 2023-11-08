"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useVectorInterpolation = exports.usePathInterpolation = exports.useClock = exports.notifyChange = void 0;

var _react = require("react");

var _animation = require("../../animation");

var _skia = require("../../skia");

var _moduleWrapper = require("./moduleWrapper");

const notifyChange = value => {
  "worklet"; // eslint-disable-next-line @typescript-eslint/no-explicit-any

  value._value = value.value;
};

exports.notifyChange = notifyChange;

const useClock = () => {
  const clock = (0, _moduleWrapper.useSharedValue)(0);
  (0, _moduleWrapper.useFrameCallback)(info => {
    clock.value = info.timeSinceFirstFrame;
  });
  return clock;
};
/**
 * @worklet
 */


exports.useClock = useClock;

const useInterpolator = (factory, value, interpolator, input, output, options) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const init = (0, _react.useMemo)(() => factory(), []);
  const result = (0, _moduleWrapper.useSharedValue)(init);
  (0, _moduleWrapper.useAnimatedReaction)(() => value.value, val => {
    result.value = interpolator(val, input, output, options, result.value);
    notifyChange(result);
  }, [input, output, options]);
  return result;
};

const usePathInterpolation = (value, input, outputRange, options) => useInterpolator(() => _skia.Skia.Path.Make(), value, _animation.interpolatePaths, input, outputRange, options);

exports.usePathInterpolation = usePathInterpolation;

const useVectorInterpolation = (value, input, outputRange, options) => useInterpolator(() => _skia.Skia.Point(0, 0), value, _animation.interpolateVector, input, outputRange, options);

exports.useVectorInterpolation = useVectorInterpolation;
//# sourceMappingURL=interpolators.js.map