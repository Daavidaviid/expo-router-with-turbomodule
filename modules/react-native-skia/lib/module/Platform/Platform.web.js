import React, { useLayoutEffect, useMemo, useRef } from "react";
import { isRNModule } from "../skia/types";
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
  useLayoutEffect(() => {
    const node = ref.current;

    if (node !== null) {
      node[DOM_LAYOUT_HANDLER_NAME] = onLayout;
    }
  }, [ref, onLayout]);
  useLayoutEffect(() => {
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
  const style = useMemo(() => rawStyle !== null && rawStyle !== void 0 ? rawStyle : {}, [rawStyle]);
  const ref = useRef(null);
  useElementLayout(ref, onLayout);
  const cssStyles = useMemo(() => {
    return { ...style,
      display: "flex",
      flexDirection: style.flexDirection || "inherit",
      flexWrap: style.flexWrap || "nowrap",
      justifyContent: style.justifyContent || "flex-start",
      alignItems: style.alignItems || "stretch",
      alignContent: style.alignContent || "stretch"
    };
  }, [style]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: cssStyles
  }, children);
};

export const Platform = {
  OS: "web",
  PixelRatio: window.devicePixelRatio,
  resolveAsset: source => {
    if (isRNModule(source)) {
      throw new Error("Image source is a number - this is not supported on the web");
    }

    return source.default;
  },
  findNodeHandle: () => {
    throw new Error("findNodeHandle is not supported on the web");
  },
  View
};
//# sourceMappingURL=Platform.web.js.map