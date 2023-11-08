"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkiaDomView = void 0;

var _skia = require("../skia");

var _DrawingContext = require("../dom/types/DrawingContext");

var _Animations = require("../renderer/processors/Animations/Animations");

var _SkiaBaseWebView = require("./SkiaBaseWebView");

class SkiaDomView extends _SkiaBaseWebView.SkiaBaseWebView {
  constructor(props) {
    super(props);
  }

  renderInCanvas(canvas, touches) {
    if (this.props.onTouch) {
      this.props.onTouch([touches]);
    }

    if (this.props.onSize) {
      const {
        width,
        height
      } = this.getSize();

      if ((0, _Animations.isValue)(this.props.onSize)) {
        this.props.onSize.current = {
          width,
          height
        };
      } else {
        this.props.onSize.value = {
          width,
          height
        };
      }
    }

    if (this.props.root) {
      const ctx = new _DrawingContext.JsiDrawingContext(_skia.Skia, canvas);
      this.props.root.render(ctx);
    }
  }

}

exports.SkiaDomView = SkiaDomView;
//# sourceMappingURL=SkiaDomView.web.js.map