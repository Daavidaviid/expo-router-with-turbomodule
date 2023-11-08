"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageSVGNode = void 0;

var _types = require("../../types");

var _DrawingNode = require("../DrawingNode");

class ImageSVGNode extends _DrawingNode.JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, _types.NodeType.ImageSVG, props);
  }

  deriveProps() {
    if (this.props.rect) {
      return this.props.rect;
    }

    const {
      x,
      y,
      width,
      height
    } = this.props;
    return {
      x,
      y,
      width,
      height
    };
  }

  draw(_ref) {
    let {
      canvas
    } = _ref;
    const {
      svg
    } = this.props;

    if (!this.derived) {
      throw new Error("ImageSVGNode: derived props unresolved");
    }

    const {
      x,
      y,
      width,
      height
    } = this.derived;

    if (svg === null) {
      return;
    }

    canvas.save();

    if (x && y) {
      canvas.translate(x, y);
    }

    canvas.drawSvg(svg, width, height);
    canvas.restore();
  }

}

exports.ImageSVGNode = ImageSVGNode;
//# sourceMappingURL=ImageSVG.js.map