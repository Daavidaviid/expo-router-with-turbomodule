"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindReanimatedProps = bindReanimatedProps;
exports.extractReanimatedProps = extractReanimatedProps;
exports.unbindReanimatedNode = void 0;

var _moduleWrapper = require("./moduleWrapper");

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable reanimated/js-function-in-worklet */
const _bindings = new WeakMap();

const unbindReanimatedNode = node => {
  const previousMapperId = _bindings.get(node);

  if (previousMapperId !== undefined) {
    (0, _moduleWrapper.stopMapper)(previousMapperId);
  }
};

exports.unbindReanimatedNode = unbindReanimatedNode;

function extractReanimatedProps(props) {
  if (!_moduleWrapper.HAS_REANIMATED3 && !_moduleWrapper.HAS_REANIMATED2) {
    return [props, {}];
  }

  const reanimatedProps = {};
  const otherProps = {};

  for (const propName in props) {
    if (propName === "children") {
      continue;
    }

    const propValue = props[propName];

    if ((0, _moduleWrapper.isSharedValue)(propValue)) {
      reanimatedProps[propName] = propValue;
      otherProps[propName] = propValue.value;
    } else {
      otherProps[propName] = propValue;
    }
  }

  return [otherProps, reanimatedProps];
}

function bindReanimatedProps2(container, node, reanimatedProps) {
  const sharedValues = Object.values(reanimatedProps);

  const previousMapperId = _bindings.get(node);

  if (previousMapperId !== undefined) {
    (0, _moduleWrapper.stopMapper)(previousMapperId);
  }

  if (sharedValues.length > 0) {
    const viewId = container.getNativeId();
    const {
      SkiaViewApi
    } = global;

    const updateProps = () => {
      for (const propName in reanimatedProps) {
        node && node.setProp(propName, reanimatedProps[propName].value);
      } // On React Native we use the SkiaViewApi to redraw because it can
      // run on the worklet thread (container.redraw can't)
      // if SkiaViewApi is undefined, we are on web and container.redraw()
      // can safely be invoked


      if (SkiaViewApi) {
        SkiaViewApi.requestRedraw(viewId);
      } else {
        container.redraw();
      }
    };

    const mapperId = (0, _moduleWrapper.startMapper)(() => {
      "worklet";

      (0, _moduleWrapper.runOnJS)(updateProps)();
    }, sharedValues);

    _bindings.set(node, mapperId);
  }
}

function bindReanimatedProps(container, node, reanimatedProps) {
  if (_moduleWrapper.HAS_REANIMATED2 && !_moduleWrapper.HAS_REANIMATED3) {
    return bindReanimatedProps2(container, node, reanimatedProps);
  }

  if (!_moduleWrapper.HAS_REANIMATED3) {
    return;
  }

  const sharedValues = Object.values(reanimatedProps);

  const previousMapperId = _bindings.get(node);

  if (previousMapperId !== undefined) {
    (0, _moduleWrapper.stopMapper)(previousMapperId);
  }

  if (sharedValues.length > 0) {
    const viewId = container.getNativeId();
    const {
      SkiaViewApi
    } = global;
    const mapperId = (0, _moduleWrapper.startMapper)(() => {
      "worklet";

      if (node) {
        for (const propName in reanimatedProps) {
          node.setProp(propName, reanimatedProps[propName].value);
        }
      } // On React Native we use the SkiaViewApi to redraw because it can
      // run on the worklet thread (container.redraw can't)
      // if SkiaViewApi is undefined, we are on web and container.redraw()
      // can safely be invoked


      if (SkiaViewApi) {
        SkiaViewApi.requestRedraw(viewId);
      } else {
        container.redraw();
      }
    }, sharedValues);

    _bindings.set(node, mapperId);
  }
}
//# sourceMappingURL=renderHelpers.js.map