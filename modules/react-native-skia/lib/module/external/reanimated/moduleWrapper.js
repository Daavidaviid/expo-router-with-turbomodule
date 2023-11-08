var _Reanimated, _Reanimated2, _Reanimated3, _Reanimated4, _Reanimated5, _Reanimated6;

/* eslint-disable @typescript-eslint/no-explicit-any */
// This one is needed for the deprecated useSharedValue function
// We can remove it once we remove the deprecation
let Reanimated2;
let Reanimated3;
let reanimatedVersion;

try {
  Reanimated2 = require("react-native-reanimated");
  reanimatedVersion = require("react-native-reanimated/package.json").version;

  if (reanimatedVersion && (reanimatedVersion >= "3.0.0" || reanimatedVersion.includes("3.0.0-"))) {
    Reanimated3 = Reanimated2;
  }
} catch (e) {}

export const HAS_REANIMATED2 = !!Reanimated2;
export const HAS_REANIMATED3 = !!Reanimated3;
export function throwOnMissingReanimated() {
  if (!HAS_REANIMATED2) {
    throw new Error("Reanimated was not found, make sure react-native-reanimated package is installed if you want to use \
      react-native-skia's integration layer API.");
  }
}
export const useSharedValue = ((_Reanimated = Reanimated2) === null || _Reanimated === void 0 ? void 0 : _Reanimated.useSharedValue) || throwOnMissingReanimated;
export const useFrameCallback = ((_Reanimated2 = Reanimated2) === null || _Reanimated2 === void 0 ? void 0 : _Reanimated2.useFrameCallback) || throwOnMissingReanimated;
export const startMapper = ((_Reanimated3 = Reanimated2) === null || _Reanimated3 === void 0 ? void 0 : _Reanimated3.startMapper) || throwOnMissingReanimated;
export const stopMapper = ((_Reanimated4 = Reanimated2) === null || _Reanimated4 === void 0 ? void 0 : _Reanimated4.stopMapper) || throwOnMissingReanimated;
export const runOnJS = ((_Reanimated5 = Reanimated2) === null || _Reanimated5 === void 0 ? void 0 : _Reanimated5.runOnJS) || throwOnMissingReanimated;
export const useAnimatedReaction = ((_Reanimated6 = Reanimated2) === null || _Reanimated6 === void 0 ? void 0 : _Reanimated6.useAnimatedReaction) || throwOnMissingReanimated;
export const isSharedValue = value => {
  return !!value && (Reanimated3 ? Reanimated3.isSharedValue(value) : value.value !== undefined);
};
//# sourceMappingURL=moduleWrapper.js.map