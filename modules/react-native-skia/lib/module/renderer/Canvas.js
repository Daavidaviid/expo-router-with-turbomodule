function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useEffect, useCallback, useMemo, forwardRef, useRef, useLayoutEffect } from "react";
import { SkiaDomView, SkiaView } from "../views";
import { Skia } from "../skia/Skia";
import { JsiDrawingContext } from "../dom/types";
import { useValue } from "../values";
import { SkiaRoot } from "./Reconciler";
import { NATIVE_DOM } from "./HostComponents";
import { isValue } from "./processors";
export const useCanvasRef = () => useRef(null);

const useOnSizeEvent = resultValue => {
  const onSize = useValue({
    width: 0,
    height: 0
  });
  useLayoutEffect(() => {
    if (!resultValue) {
      return;
    }

    return onSize.addListener(newValue => {
      if (isValue(resultValue)) {
        resultValue.current = newValue;
      } else {
        resultValue.value = newValue;
      }
    });
  }, [resultValue, onSize]);
  return onSize;
};

export const Canvas = /*#__PURE__*/forwardRef((_ref, forwardedRef) => {
  let {
    children,
    style,
    debug,
    mode,
    onTouch,
    onSize: _onSize,
    ...props
  } = _ref;
  const onSize = useOnSizeEvent(_onSize);
  const innerRef = useCanvasRef();
  const ref = useCombinedRefs(forwardedRef, innerRef);
  const redraw = useCallback(() => {
    var _innerRef$current;

    (_innerRef$current = innerRef.current) === null || _innerRef$current === void 0 ? void 0 : _innerRef$current.redraw();
  }, [innerRef]);
  const getNativeId = useCallback(() => {
    var _innerRef$current$nat, _innerRef$current2;

    const id = (_innerRef$current$nat = (_innerRef$current2 = innerRef.current) === null || _innerRef$current2 === void 0 ? void 0 : _innerRef$current2.nativeId) !== null && _innerRef$current$nat !== void 0 ? _innerRef$current$nat : -1;
    return id;
  }, [innerRef]);
  const registerValues = useCallback(values => {
    if (ref.current !== null) {
      return ref.current.registerValues(values);
    }

    return () => {};
  }, [ref]);
  const root = useMemo(() => new SkiaRoot(Skia, registerValues, redraw, getNativeId), [redraw, registerValues, getNativeId]); // Render effect

  useEffect(() => {
    root.render(children);
  }, [children, root, redraw]);
  useEffect(() => {
    return () => {
      root.unmount();
    };
  }, [root]);

  if (NATIVE_DOM) {
    return /*#__PURE__*/React.createElement(SkiaDomView, _extends({
      ref: ref,
      style: style,
      root: root.dom,
      onTouch: onTouch,
      onSize: onSize,
      mode: mode,
      debug: debug
    }, props));
  } else {
    return /*#__PURE__*/React.createElement(SkiaView // eslint-disable-next-line @typescript-eslint/no-explicit-any
    , _extends({
      ref: ref,
      style: style,
      mode: mode,
      debug: debug,
      onSize: onSize,
      onDraw: (canvas, info) => {
        onTouch && onTouch(info.touches);
        const ctx = new JsiDrawingContext(Skia, canvas);
        root.dom.render(ctx);
      }
    }, props));
  }
});
/**
 * Combines a list of refs into a single ref. This can be used to provide
 * both a forwarded ref and an internal ref keeping the same functionality
 * on both of the refs.
 * @param refs Array of refs to combine
 * @returns A single ref that can be used in a ref prop.
 */

const useCombinedRefs = function () {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }

  const targetRef = React.useRef(null);
  React.useEffect(() => {
    refs.forEach(ref => {
      if (ref) {
        if (typeof ref === "function") {
          ref(targetRef.current);
        } else {
          ref.current = targetRef.current;
        }
      }
    });
  }, [refs]);
  return targetRef;
};
//# sourceMappingURL=Canvas.js.map