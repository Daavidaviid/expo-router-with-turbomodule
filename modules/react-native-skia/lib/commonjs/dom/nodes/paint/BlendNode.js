"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlendNode = void 0;

var _types = require("../../../skia/types");

var _NodeType = require("../../types/NodeType");

var _Node = require("../Node");

var _datatypes = require("../datatypes");

var _DeclarationContext = require("../../types/DeclarationContext");

class BlendNode extends _Node.JsiDeclarationNode {
  constructor(ctx, props) {
    super(ctx, _NodeType.DeclarationType.ImageFilter, _NodeType.NodeType.Blend, props);
  }

  decorate(ctx) {
    this.decorateChildren(ctx);
    const {
      Skia
    } = this;

    const blend = _types.BlendMode[(0, _datatypes.enumKey)(this.props.mode)]; // Blend ImageFilters


    const imageFilters = ctx.imageFilters.popAll();

    if (imageFilters.length > 0) {
      const composer = Skia.ImageFilter.MakeBlend.bind(Skia.ImageFilter, blend);
      ctx.imageFilters.push((0, _DeclarationContext.composeDeclarations)(imageFilters, composer));
    } // Blend Shaders


    const shaders = ctx.shaders.popAll();

    if (shaders.length > 0) {
      const composer = Skia.Shader.MakeBlend.bind(Skia.Shader, blend);
      ctx.shaders.push((0, _DeclarationContext.composeDeclarations)(shaders, composer));
    }
  }

}

exports.BlendNode = BlendNode;
//# sourceMappingURL=BlendNode.js.map