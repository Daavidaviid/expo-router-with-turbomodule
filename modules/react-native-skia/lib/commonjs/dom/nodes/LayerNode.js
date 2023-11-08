"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LayerNode = void 0;

var _types = require("../types");

var _RenderNode = require("./RenderNode");

var _Node = require("./Node");

class LayerNode extends _RenderNode.JsiRenderNode {
  constructor(ctx, props) {
    super(ctx, _types.NodeType.Layer, props);
  }

  renderNode(ctx) {
    let hasLayer = false;
    const [layer, ...children] = this.children();

    if (layer instanceof _Node.JsiDeclarationNode) {
      const declCtx = ctx.declarationCtx;
      declCtx.save();
      layer.decorate(declCtx);
      const paint = declCtx.paints.pop();
      declCtx.restore();

      if (paint) {
        hasLayer = true;
        ctx.canvas.saveLayer(paint);
      }
    }

    children.map(child => {
      if (child instanceof _RenderNode.JsiRenderNode) {
        child.render(ctx);
      }
    });

    if (hasLayer) {
      ctx.canvas.restore();
    }
  }

}

exports.LayerNode = LayerNode;
//# sourceMappingURL=LayerNode.js.map