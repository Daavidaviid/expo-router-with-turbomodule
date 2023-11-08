"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDerivedValueOnJS = void 0;

var _react = require("react");

var _moduleWrapper = require("./moduleWrapper");

const useDerivedValueOnJS = (fn, deps) => {
  const init = (0, _react.useMemo)(() => fn(), [fn]);
  const value = (0, _moduleWrapper.useSharedValue)(init);
  (0, _react.useEffect)(() => {
    const mapperId = (0, _moduleWrapper.startMapper)(() => {
      "worklet";

      (0, _moduleWrapper.runOnJS)(fn)();
    }, deps);
    return () => (0, _moduleWrapper.stopMapper)(mapperId);
  }, [deps, fn]);
  return value;
};

exports.useDerivedValueOnJS = useDerivedValueOnJS;
//# sourceMappingURL=useDerivedValueOnJS.js.map