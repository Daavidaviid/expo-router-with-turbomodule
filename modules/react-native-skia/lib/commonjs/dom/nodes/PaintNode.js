"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaintNode = void 0;

var _types = require("../../skia/types");

var _types2 = require("../types");

var _datatypes = require("./datatypes");

var _Node = require("./Node");

class PaintNode extends _Node.JsiDeclarationNode {
  constructor(ctx) {
    let props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(ctx, _types2.DeclarationType.Paint, _types2.NodeType.Paint, props);
  }

  decorate(ctx) {
    const {
      color,
      strokeWidth,
      blendMode,
      style,
      strokeJoin,
      strokeCap,
      strokeMiter,
      opacity,
      antiAlias,
      dither
    } = this.props;
    const paint = this.Skia.Paint();

    if (color !== undefined) {
      paint.setColor(this.Skia.Color(color));
    }

    if (strokeWidth !== undefined) {
      paint.setStrokeWidth(strokeWidth);
    }

    if (blendMode !== undefined) {
      paint.setBlendMode(_types.BlendMode[(0, _datatypes.enumKey)(blendMode)]);
    }

    if (style !== undefined) {
      paint.setStyle(_types.PaintStyle[(0, _datatypes.enumKey)(style)]);
    }

    if (strokeJoin !== undefined) {
      paint.setStrokeJoin(_types.StrokeJoin[(0, _datatypes.enumKey)(strokeJoin)]);
    }

    if (strokeCap !== undefined) {
      paint.setStrokeCap(_types.StrokeCap[(0, _datatypes.enumKey)(strokeCap)]);
    }

    if (strokeMiter !== undefined) {
      paint.setStrokeMiter(strokeMiter);
    }

    if (opacity !== undefined) {
      paint.setAlphaf(opacity);
    }

    if (antiAlias !== undefined) {
      paint.setAntiAlias(antiAlias);
    }

    if (dither !== undefined) {
      paint.setDither(dither);
    }

    ctx.save();

    this._children.forEach(child => {
      if (child instanceof _Node.JsiDeclarationNode) {
        child.decorate(ctx);
      }
    });

    const colorFilter = ctx.colorFilters.popAllAsOne();
    const imageFilter = ctx.imageFilters.popAllAsOne();
    const shader = ctx.shaders.pop();
    const maskFilter = ctx.maskFilters.pop();
    const pathEffect = ctx.pathEffects.popAllAsOne();
    ctx.restore();

    if (imageFilter) {
      paint.setImageFilter(imageFilter);
    }

    if (shader) {
      paint.setShader(shader);
    }

    if (pathEffect) {
      paint.setPathEffect(pathEffect);
    }

    if (colorFilter) {
      paint.setColorFilter(colorFilter);
    }

    if (maskFilter) {
      paint.setMaskFilter(maskFilter);
    }

    ctx.paints.push(paint);
  }

}

exports.PaintNode = PaintNode;
//# sourceMappingURL=PaintNode.js.map