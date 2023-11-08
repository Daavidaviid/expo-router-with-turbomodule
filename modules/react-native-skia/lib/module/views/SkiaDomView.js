function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "react";
import { Platform } from "../Platform";
import SkiaDomViewNativeComponent from "../specs/SkiaDomViewNativeComponent";
import { SkiaViewApi } from "./api";
import { SkiaViewNativeId } from "./SkiaView";
const NativeSkiaDomView = Platform.OS !== "web" ? SkiaDomViewNativeComponent : // eslint-disable-next-line @typescript-eslint/no-explicit-any
null;
export class SkiaDomView extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "_nativeId", void 0);

    this._nativeId = SkiaViewNativeId.current++;
    const {
      root,
      onTouch,
      onSize
    } = props;

    if (root) {
      assertSkiaViewApi();
      SkiaViewApi.setJsiProperty(this._nativeId, "root", root);
    }

    if (onTouch) {
      assertSkiaViewApi();
      SkiaViewApi.setJsiProperty(this._nativeId, "onTouch", onTouch);
    }

    if (onSize) {
      assertSkiaViewApi();
      SkiaViewApi.setJsiProperty(this._nativeId, "onSize", onSize);
    }
  }

  get nativeId() {
    return this._nativeId;
  }

  componentDidUpdate(prevProps) {
    const {
      root,
      onTouch,
      onSize
    } = this.props;

    if (root !== prevProps.root) {
      assertSkiaViewApi();
      SkiaViewApi.setJsiProperty(this._nativeId, "root", root);
    }

    if (onTouch !== prevProps.onTouch) {
      assertSkiaViewApi();
      SkiaViewApi.setJsiProperty(this._nativeId, "onTouch", onTouch);
    }

    if (onSize !== prevProps.onSize) {
      assertSkiaViewApi();
      SkiaViewApi.setJsiProperty(this._nativeId, "onSize", onSize);
    }
  }
  /**
   * Creates a snapshot from the canvas in the surface
   * @param rect Rect to use as bounds. Optional.
   * @returns An Image object.
   */


  makeImageSnapshot(rect) {
    assertSkiaViewApi();
    return SkiaViewApi.makeImageSnapshot(this._nativeId, rect);
  }
  /**
   * Sends a redraw request to the native SkiaView.
   */


  redraw() {
    assertSkiaViewApi();
    SkiaViewApi.requestRedraw(this._nativeId);
  }
  /**
   * Registers one or move values as a dependant value of the Skia View. The view will
   * The view will redraw itself when any of the values change.
   * @param values Values to register
   */


  registerValues(values) {
    assertSkiaViewApi();
    return SkiaViewApi.registerValuesInView(this._nativeId, values);
  }
  /**
   * Clear up the dom node when unmounting to release resources.
   */


  componentWillUnmount() {
    assertSkiaViewApi();
    SkiaViewApi.setJsiProperty(this._nativeId, "root", null);
  }

  render() {
    const {
      mode,
      debug = false,
      ...viewProps
    } = this.props;
    return /*#__PURE__*/React.createElement(NativeSkiaDomView, _extends({
      collapsable: false,
      nativeID: `${this._nativeId}`,
      mode: mode,
      debug: debug
    }, viewProps));
  }

}

const assertSkiaViewApi = () => {
  if (SkiaViewApi === null || SkiaViewApi.setJsiProperty === null || SkiaViewApi.callJsiMethod === null || SkiaViewApi.registerValuesInView === null || SkiaViewApi.requestRedraw === null || SkiaViewApi.makeImageSnapshot === null) {
    throw Error("Skia View Api was not found.");
  }
};
//# sourceMappingURL=SkiaDomView.js.map