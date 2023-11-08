"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopMapper = exports.startMapper = exports.runOnJS = exports.isSharedValue = exports.HAS_REANIMATED3 = exports.HAS_REANIMATED2 = void 0;
exports.throwOnMissingReanimated = throwOnMissingReanimated;
exports.useSharedValue = exports.useFrameCallback = exports.useAnimatedReaction = void 0;

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

const HAS_REANIMATED2 = !!Reanimated2;
exports.HAS_REANIMATED2 = HAS_REANIMATED2;
const HAS_REANIMATED3 = !!Reanimated3;
exports.HAS_REANIMATED3 = HAS_REANIMATED3;

function throwOnMissingReanimated() {
  if (!HAS_REANIMATED2) {
    throw new Error("Reanimated was not found, make sure react-native-reanimated package is installed if you want to use \
      react-native-skia's integration layer API.");
  }
}

const useSharedValue = ((_Reanimated = Reanimated2) === null || _Reanimated === void 0 ? void 0 : _Reanimated.useSharedValue) || throwOnMissingReanimated;
exports.useSharedValue = useSharedValue;
const useFrameCallback = ((_Reanimated2 = Reanimated2) === null || _Reanimated2 === void 0 ? void 0 : _Reanimated2.useFrameCallback) || throwOnMissingReanimated;
exports.useFrameCallback = useFrameCallback;
const startMapper = ((_Reanimated3 = Reanimated2) === null || _Reanimated3 === void 0 ? void 0 : _Reanimated3.startMapper) || throwOnMissingReanimated;
exports.startMapper = startMapper;
const stopMapper = ((_Reanimated4 = Reanimated2) === null || _Reanimated4 === void 0 ? void 0 : _Reanimated4.stopMapper) || throwOnMissingReanimated;
exports.stopMapper = stopMapper;
const runOnJS = ((_Reanimated5 = Reanimated2) === null || _Reanimated5 === void 0 ? void 0 : _Reanimated5.runOnJS) || throwOnMissingReanimated;
exports.runOnJS = runOnJS;
const useAnimatedReaction = ((_Reanimated6 = Reanimated2) === null || _Reanimated6 === void 0 ? void 0 : _Reanimated6.useAnimatedReaction) || throwOnMissingReanimated;
exports.useAnimatedReaction = useAnimatedReaction;

const isSharedValue = value => {
  return !!value && (Reanimated3 ? Reanimated3.isSharedValue(value) : value.value !== undefined);
};

exports.isSharedValue = isSharedValue;
//# sourceMappingURL=moduleWrapper.js.map