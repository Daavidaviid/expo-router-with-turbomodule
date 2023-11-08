"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkiaView = void 0;

var _SkiaBaseWebView = require("./SkiaBaseWebView");

class SkiaView extends _SkiaBaseWebView.SkiaBaseWebView {
  constructor(props) {
    super(props);
  }

  renderInCanvas(canvas, touches) {
    if (this.props.onDraw) {
      const info = {
        height: this.height,
        width: this.width,
        timestamp: Date.now(),
        touches: touches.map(t => [t])
      };
      this.props.onDraw(canvas, info);
    }
  }

}

exports.SkiaView = SkiaView;
//# sourceMappingURL=SkiaView.web.js.map