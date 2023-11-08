"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SRGBToLinearGammaColorFilterNode = exports.MatrixColorFilterNode = exports.LumaColorFilterNode = exports.LinearToSRGBGammaColorFilterNode = exports.LerpColorFilterNode = exports.ColorFilterDeclaration = exports.BlendColorFilterNode = void 0;

var _types = require("../../../skia/types");

var _Node = require("../Node");

var _types2 = require("../../types");

var _Enum = require("../datatypes/Enum");

class ColorFilterDeclaration extends _Node.JsiDeclarationNode {
  constructor(ctx, type, props) {
    super(ctx, _types2.DeclarationType.ColorFilter, type, props);
  }

  composeAndPush(ctx, cf1) {
    ctx.save();
    this.decorateChildren(ctx);
    const cf2 = ctx.colorFilters.popAllAsOne();
    ctx.restore();
    const cf = cf2 ? this.Skia.ColorFilter.MakeCompose(cf1, cf2) : cf1;
    ctx.colorFilters.push(cf);
  }

}

exports.ColorFilterDeclaration = ColorFilterDeclaration;

class MatrixColorFilterNode extends ColorFilterDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.MatrixColorFilter, props);
  }

  decorate(ctx) {
    const {
      matrix
    } = this.props;
    const cf = this.Skia.ColorFilter.MakeMatrix(matrix);
    this.composeAndPush(ctx, cf);
  }

}

exports.MatrixColorFilterNode = MatrixColorFilterNode;

class BlendColorFilterNode extends ColorFilterDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.BlendColorFilter, props);
  }

  decorate(ctx) {
    const {
      mode
    } = this.props;
    const color = this.Skia.Color(this.props.color);
    const cf = this.Skia.ColorFilter.MakeBlend(color, _types.BlendMode[(0, _Enum.enumKey)(mode)]);
    this.composeAndPush(ctx, cf);
  }

}

exports.BlendColorFilterNode = BlendColorFilterNode;

class LinearToSRGBGammaColorFilterNode extends ColorFilterDeclaration {
  constructor(ctx) {
    super(ctx, _types2.NodeType.LinearToSRGBGammaColorFilter, null);
  }

  decorate(ctx) {
    const cf = this.Skia.ColorFilter.MakeLinearToSRGBGamma();
    this.composeAndPush(ctx, cf);
  }

}

exports.LinearToSRGBGammaColorFilterNode = LinearToSRGBGammaColorFilterNode;

class SRGBToLinearGammaColorFilterNode extends ColorFilterDeclaration {
  constructor(ctx) {
    super(ctx, _types2.NodeType.SRGBToLinearGammaColorFilter, null);
  }

  decorate(ctx) {
    const cf = this.Skia.ColorFilter.MakeSRGBToLinearGamma();
    this.composeAndPush(ctx, cf);
  }

}

exports.SRGBToLinearGammaColorFilterNode = SRGBToLinearGammaColorFilterNode;

class LumaColorFilterNode extends ColorFilterDeclaration {
  constructor(ctx) {
    super(ctx, _types2.NodeType.LumaColorFilter, null);
  }

  decorate(ctx) {
    const cf = this.Skia.ColorFilter.MakeLumaColorFilter();
    this.composeAndPush(ctx, cf);
  }

}

exports.LumaColorFilterNode = LumaColorFilterNode;

class LerpColorFilterNode extends ColorFilterDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.LerpColorFilter, props);
  }

  decorate(ctx) {
    ctx.save();
    this.decorateChildren(ctx);
    const {
      t
    } = this.props;
    const second = ctx.colorFilters.pop();
    const first = ctx.colorFilters.pop();
    ctx.restore();

    if (!first || !second) {
      throw new Error("LerpColorFilterNode: missing two color filters as children");
    }

    ctx.colorFilters.push(this.Skia.ColorFilter.MakeLerp(t, first, second));
  }

}

exports.LerpColorFilterNode = LerpColorFilterNode;
//# sourceMappingURL=ColorFilters.js.map