"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackdropFilterNode = void 0;

var _types = require("../../types");

var _DrawingNode = require("../DrawingNode");

var _Node = require("../Node");

class BackdropFilterNode extends _DrawingNode.JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, _types.NodeType.BackdropFilter, props);
  }

  deriveProps() {
    return null;
  }

  draw(_ref) {
    let {
      canvas,
      declarationCtx
    } = _ref;
    const child = this._children[0];
    let imageFilter = null;

    if (child instanceof _Node.JsiDeclarationNode) {
      declarationCtx.save();
      child.decorate(declarationCtx);
      const imgf = declarationCtx.imageFilters.pop();

      if (imgf) {
        imageFilter = imgf;
      } else {
        const cf = declarationCtx.colorFilters.pop();

        if (cf) {
          imageFilter = this.Skia.ImageFilter.MakeColorFilter(cf, null);
        }
      }

      declarationCtx.restore();
    }

    canvas.saveLayer(undefined, null, imageFilter);
    canvas.restore();
  }

}

exports.BackdropFilterNode = BackdropFilterNode;
//# sourceMappingURL=BackdropFilterNode.js.map