function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* global HTMLCanvasElement */
import React from "react";
import { JsiSkSurface } from "../skia/web/JsiSkSurface";
import { Platform } from "../Platform";
import { TouchType } from "./types";
const pd = Platform.PixelRatio;
export class SkiaBaseWebView extends React.Component {
  constructor(props) {
    var _props$mode;

    super(props);

    _defineProperty(this, "_surface", null);

    _defineProperty(this, "_unsubscriptions", []);

    _defineProperty(this, "_touches", []);

    _defineProperty(this, "_canvas", null);

    _defineProperty(this, "_canvasRef", /*#__PURE__*/React.createRef());

    _defineProperty(this, "_mode", void 0);

    _defineProperty(this, "_redrawRequests", 0);

    _defineProperty(this, "requestId", 0);

    _defineProperty(this, "width", 0);

    _defineProperty(this, "height", 0);

    _defineProperty(this, "onStart", this.createTouchHandler(TouchType.Start));

    _defineProperty(this, "onActive", this.createTouchHandler(TouchType.Active));

    _defineProperty(this, "onCancel", this.createTouchHandler(TouchType.Cancelled));

    _defineProperty(this, "onEnd", this.createTouchHandler(TouchType.End));

    _defineProperty(this, "onLayout", this.onLayoutEvent.bind(this));

    this._mode = (_props$mode = props.mode) !== null && _props$mode !== void 0 ? _props$mode : "default";
  }

  unsubscribeAll() {
    this._unsubscriptions.forEach(u => u());

    this._unsubscriptions = [];
  }

  onLayoutEvent(evt) {
    const {
      CanvasKit
    } = global; // Reset canvas / surface on layout change

    const canvas = this._canvasRef.current;

    if (canvas) {
      this.width = canvas.clientWidth;
      this.height = canvas.clientHeight;
      canvas.width = this.width * pd;
      canvas.height = this.height * pd;
      const surface = CanvasKit.MakeWebGLCanvasSurface(canvas);

      if (!surface) {
        throw new Error("Could not create surface");
      }

      this._surface = new JsiSkSurface(CanvasKit, surface);
      this._canvas = this._surface.getCanvas();
      this.redraw();
    } // Call onLayout callback if it exists


    if (this.props.onLayout) {
      this.props.onLayout(evt);
    }
  }

  getSize() {
    return {
      width: this.width,
      height: this.height
    };
  }

  componentDidMount() {
    // Start render loop
    this.tick();
  }

  componentDidUpdate() {
    this.redraw();
  }

  componentWillUnmount() {
    this.unsubscribeAll();
    cancelAnimationFrame(this.requestId); // eslint-disable-next-line max-len
    // https://stackoverflow.com/questions/23598471/how-do-i-clean-up-and-unload-a-webgl-canvas-context-from-gpu-after-use
    // https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_lose_context
    // We delete the context, only if the context has been intialized

    if (this._surface) {
      var _this$_canvasRef$curr, _this$_canvasRef$curr2, _this$_canvasRef$curr3;

      (_this$_canvasRef$curr = this._canvasRef.current) === null || _this$_canvasRef$curr === void 0 ? void 0 : (_this$_canvasRef$curr2 = _this$_canvasRef$curr.getContext("webgl2")) === null || _this$_canvasRef$curr2 === void 0 ? void 0 : (_this$_canvasRef$curr3 = _this$_canvasRef$curr2.getExtension("WEBGL_lose_context")) === null || _this$_canvasRef$curr3 === void 0 ? void 0 : _this$_canvasRef$curr3.loseContext();
    }
  }
  /**
   * Creates a snapshot from the canvas in the surface
   * @param rect Rect to use as bounds. Optional.
   * @returns An Image object.
   */


  makeImageSnapshot(rect) {
    var _this$_surface, _this$_surface2;

    this._canvas.clear(CanvasKit.TRANSPARENT);

    this.renderInCanvas(this._canvas, []);
    (_this$_surface = this._surface) === null || _this$_surface === void 0 ? void 0 : _this$_surface.ref.flush();
    return (_this$_surface2 = this._surface) === null || _this$_surface2 === void 0 ? void 0 : _this$_surface2.makeImageSnapshot(rect);
  }
  /**
   * Override to render
   */


  /**
   * Sends a redraw request to the native SkiaView.
   */
  tick() {
    if (this._mode === "continuous" || this._redrawRequests > 0) {
      this._redrawRequests = 0;

      if (this._canvas) {
        var _this$_surface3;

        const touches = [...this._touches];
        this._touches = [];
        const canvas = this._canvas;
        canvas.clear(Float32Array.of(0, 0, 0, 0));
        canvas.save();
        canvas.scale(pd, pd);
        this.renderInCanvas(canvas, touches);
        canvas.restore();
        (_this$_surface3 = this._surface) === null || _this$_surface3 === void 0 ? void 0 : _this$_surface3.ref.flush();
      }
    }

    this.requestId = requestAnimationFrame(this.tick.bind(this));
  }

  redraw() {
    this._redrawRequests++;
  }
  /**
   * Updates the drawing mode for the skia view. This is the same
   * as declaratively setting the mode property on the SkiaView.
   * There are two drawing modes, "continuous" and "default",
   * where the continuous mode will continuously redraw the view and
   * the default mode will only redraw when any of the regular react
   * properties are changed like size and margins.
   * @param mode Drawing mode to use.
   */


  setDrawMode(mode) {
    this._mode = mode;
    this.tick();
  }
  /**
   * Registers one or move values as a dependant value of the Skia View. The view will
   * The view will redraw itself when any of the values change.
   * @param values Values to register
   */


  registerValues(_values) {
    // Unsubscribe from dependency values
    this.unsubscribeAll(); // Register redraw dependencies on values

    _values.forEach(v => {
      this._unsubscriptions.push(v.addListener(() => {
        this.redraw();
      }));
    });
  }

  handleTouchEvent(evt, touchType) {
    this._touches.push({
      id: evt.pointerId,
      x: evt.clientX - evt.currentTarget.getClientRects()[0].left,
      y: evt.clientY - evt.currentTarget.getClientRects()[0].top,
      force: evt.pressure,
      type: touchType,
      timestamp: Date.now()
    });

    this.redraw();
  }

  createTouchHandler(touchType) {
    return evt => this.handleTouchEvent(evt, touchType);
  }

  render() {
    const {
      mode,
      debug = false,
      ...viewProps
    } = this.props;
    return /*#__PURE__*/React.createElement(Platform.View, _extends({}, viewProps, {
      onLayout: this.onLayout
    }), /*#__PURE__*/React.createElement("canvas", {
      ref: this._canvasRef,
      style: {
        display: "flex",
        flex: 1
      },
      onPointerDown: this.onStart,
      onPointerMove: this.onActive,
      onPointerUp: this.onEnd,
      onPointerCancel: this.onCancel,
      onPointerLeave: this.onEnd,
      onPointerOut: this.onEnd
    }));
  }

}
//# sourceMappingURL=SkiaBaseWebView.js.map