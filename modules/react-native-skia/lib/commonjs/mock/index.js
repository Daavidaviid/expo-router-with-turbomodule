"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mock = void 0;

var _web = require("../skia/web");

var _web2 = require("../values/web");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Noop = () => undefined;

const NoopValue = () => ({
  current: 0
});

const NoopSharedValue = () => ({
  value: 0
});

const Mock = CanvasKit => {
  global.SkiaApi = (0, _web.JsiSkApi)(CanvasKit);
  global.SkiaValueApi = _web2.ValueApi;
  const Skia = global.SkiaApi;
  return {
    Skia,
    ...require("../renderer/components"),
    ...require("../skia"),
    ...require("../values"),
    ...require("../animation"),
    ...require("../dom/types"),
    ...require("../dom/nodes"),
    // We could use the real Canvas if we mock the SkiaView component for node
    Canvas: Noop,
    // Skia Animations
    useValue: NoopValue,
    useComputedValue: NoopValue,
    useTouchHandler: Noop,
    useTiming: NoopValue,
    useLoop: NoopValue,
    useSpring: NoopValue,
    useClockValue: NoopValue,
    useValueEffect: Noop,
    // Reanimated hooks
    useClock: NoopSharedValue,
    usePathInterpolation: NoopSharedValue,
    useRawData: Noop,
    useData: Noop,
    useFont: () => Skia.Font(undefined, 0),
    useTypeface: () => null,
    useImage: () => null,
    useSVG: () => null
  };
};

exports.Mock = Mock;
//# sourceMappingURL=index.js.map