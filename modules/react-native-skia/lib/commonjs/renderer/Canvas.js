"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCanvasRef = exports.Canvas = void 0;

var _react = _interopRequireWildcard(require("react"));

var _views = require("../views");

var _Skia = require("../skia/Skia");

var _types = require("../dom/types");

var _values = require("../values");

var _Reconciler = require("./Reconciler");

var _HostComponents = require("./HostComponents");

var _processors = require("./processors");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const useCanvasRef = () => (0, _react.useRef)(null);

exports.useCanvasRef = useCanvasRef;

const useOnSizeEvent = resultValue => {
  const onSize = (0, _values.useValue)({
    width: 0,
    height: 0
  });
  (0, _react.useLayoutEffect)(() => {
    if (!resultValue) {
      return;
    }

    return onSize.addListener(newValue => {
      if ((0, _processors.isValue)(resultValue)) {
        resultValue.current = newValue;
      } else {
        resultValue.value = newValue;
      }
    });
  }, [resultValue, onSize]);
  return onSize;
};

const Canvas = /*#__PURE__*/(0, _react.forwardRef)((_ref, forwardedRef) => {
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
  const redraw = (0, _react.useCallback)(() => {
    var _innerRef$current;

    (_innerRef$current = innerRef.current) === null || _innerRef$current === void 0 ? void 0 : _innerRef$current.redraw();
  }, [innerRef]);
  const getNativeId = (0, _react.useCallback)(() => {
    var _innerRef$current2;

    const id = ((_innerRef$current2 = innerRef.current) === null || _innerRef$current2 === void 0 ? void 0 : _innerRef$current2.nativeId) ?? -1;
    return id;
  }, [innerRef]);
  const registerValues = (0, _react.useCallback)(values => {
    if (ref.current !== null) {
      return ref.current.registerValues(values);
    }

    return () => {};
  }, [ref]);
  const root = (0, _react.useMemo)(() => new _Reconciler.SkiaRoot(_Skia.Skia, registerValues, redraw, getNativeId), [redraw, registerValues, getNativeId]); // Render effect

  (0, _react.useEffect)(() => {
    root.render(children);
  }, [children, root, redraw]);
  (0, _react.useEffect)(() => {
    return () => {
      root.unmount();
    };
  }, [root]);

  if (_HostComponents.NATIVE_DOM) {
    return /*#__PURE__*/_react.default.createElement(_views.SkiaDomView, _extends({
      ref: ref,
      style: style,
      root: root.dom,
      onTouch: onTouch,
      onSize: onSize,
      mode: mode,
      debug: debug
    }, props));
  } else {
    return /*#__PURE__*/_react.default.createElement(_views.SkiaView // eslint-disable-next-line @typescript-eslint/no-explicit-any
    , _extends({
      ref: ref,
      style: style,
      mode: mode,
      debug: debug,
      onSize: onSize,
      onDraw: (canvas, info) => {
        onTouch && onTouch(info.touches);
        const ctx = new _types.JsiDrawingContext(_Skia.Skia, canvas);
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

exports.Canvas = Canvas;

const useCombinedRefs = function () {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }

  const targetRef = _react.default.useRef(null);

  _react.default.useEffect(() => {
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