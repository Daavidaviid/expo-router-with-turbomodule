"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAnimatedImageValue = void 0;

var _AnimatedImage = require("../../skia/core/AnimatedImage");

var _moduleWrapper = require("./moduleWrapper");

const DEFAULT_FRAME_DURATION = 60;

const useAnimatedImageValue = source => {
  (0, _moduleWrapper.throwOnMissingReanimated)();
  const currentFrame = (0, _moduleWrapper.useSharedValue)(null);
  const lastTimestamp = (0, _moduleWrapper.useSharedValue)(0);
  const animatedImage = (0, _AnimatedImage.useAnimatedImage)(source, err => {
    console.error(err);
    throw new Error(`Could not load animated image - got '${err.message}'`);
  });
  const frameDuration = (animatedImage === null || animatedImage === void 0 ? void 0 : animatedImage.currentFrameDuration()) || DEFAULT_FRAME_DURATION;
  (0, _moduleWrapper.useFrameCallback)(frameInfo => {
    if (!animatedImage) {
      currentFrame.value = null;
      return;
    }

    const {
      timestamp
    } = frameInfo;
    const elapsed = timestamp - lastTimestamp.value; // Check if it's time to switch frames based on GIF frame duration

    if (elapsed < frameDuration) {
      return;
    } // Update the current frame


    animatedImage.decodeNextFrame();

    if (currentFrame.value) {
      currentFrame.value.dispose();
    }

    currentFrame.value = animatedImage.getCurrentFrame(); // Update the last timestamp

    lastTimestamp.value = timestamp; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, true);
  return currentFrame;
};

exports.useAnimatedImageValue = useAnimatedImageValue;
//# sourceMappingURL=useAnimatedImageValue.js.map