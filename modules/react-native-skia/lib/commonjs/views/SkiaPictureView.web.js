"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkiaPictureView = void 0;

var _SkiaBaseWebView = require("./SkiaBaseWebView");

class SkiaPictureView extends _SkiaBaseWebView.SkiaBaseWebView {
  constructor(props) {
    super(props);
  }

  renderInCanvas(canvas) {
    if (this.props.picture) {
      canvas.drawPicture(this.props.picture);
    }
  }

}

exports.SkiaPictureView = SkiaPictureView;
//# sourceMappingURL=SkiaPictureView.web.js.map