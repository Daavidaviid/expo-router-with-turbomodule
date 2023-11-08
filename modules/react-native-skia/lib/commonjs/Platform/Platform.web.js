"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Platform = void 0;

var _react = _interopRequireWildcard(require("react"));

var _types = require("../skia/types");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// eslint-disable-next-line max-len
// https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/modules/useElementLayout/index.js
const DOM_LAYOUT_HANDLER_NAME = "__reactLayoutHandler";
let resizeObserver = null;

const getObserver = () => {
  if (resizeObserver == null) {
    resizeObserver = new window.ResizeObserver(function (entries) {
      entries.forEach(entry => {
        const node = entry.target;
        const {
          left,
          top,
          width,
          height
        } = entry.contentRect;
        const onLayout = node[DOM_LAYOUT_HANDLER_NAME];

        if (typeof onLayout === "function") {
          // setTimeout 0 is taken from react-native-web (UIManager)
          setTimeout(() => onLayout({
            timeStamp: Date.now(),
            nativeEvent: {
              layout: {
                x: left,
                y: top,
                width,
                height
              }
            },
            currentTarget: 0,
            target: 0,
            bubbles: false,
            cancelable: false,
            defaultPrevented: false,
            eventPhase: 0,

            isDefaultPrevented() {
              throw new Error("Method not supported on web.");
            },

            isPropagationStopped() {
              throw new Error("Method not supported on web.");
            },

            persist() {
              throw new Error("Method not supported on web.");
            },

            preventDefault() {
              throw new Error("Method not supported on web.");
            },

            stopPropagation() {
              throw new Error("Method not supported on web.");
            },

            isTrusted: true,
            type: ""
          }), 0);
        }
      });
    });
  }

  return resizeObserver;
};

const useElementLayout = (ref, onLayout) => {
  const observer = getObserver();
  (0, _react.useLayoutEffect)(() => {
    const node = ref.current;

    if (node !== null) {
      node[DOM_LAYOUT_HANDLER_NAME] = onLayout;
    }
  }, [ref, onLayout]);
  (0, _react.useLayoutEffect)(() => {
    const node = ref.current;

    if (node != null && observer != null) {
      if (typeof node[DOM_LAYOUT_HANDLER_NAME] === "function") {
        observer.observe(node);
      } else {
        observer.unobserve(node);
      }
    }

    return () => {
      if (node != null && observer != null) {
        observer.unobserve(node);
      }
    };
  }, [observer, ref]);
};

const View = _ref => {
  let {
    children,
    onLayout,
    style: rawStyle
  } = _ref;
  const style = (0, _react.useMemo)(() => rawStyle ?? {}, [rawStyle]);
  const ref = (0, _react.useRef)(null);
  useElementLayout(ref, onLayout);
  const cssStyles = (0, _react.useMemo)(() => {
    return { ...style,
      display: "flex",
      flexDirection: style.flexDirection || "inherit",
      flexWrap: style.flexWrap || "nowrap",
      justifyContent: style.justifyContent || "flex-start",
      alignItems: style.alignItems || "stretch",
      alignContent: style.alignContent || "stretch"
    };
  }, [style]);
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: ref,
    style: cssStyles
  }, children);
};

const Platform = {
  OS: "web",
  PixelRatio: window.devicePixelRatio,
  resolveAsset: source => {
    if ((0, _types.isRNModule)(source)) {
      throw new Error("Image source is a number - this is not supported on the web");
    }

    return source.default;
  },
  findNodeHandle: () => {
    throw new Error("findNodeHandle is not supported on the web");
  },
  View
};
exports.Platform = Platform;
//# sourceMappingURL=Platform.web.js.map