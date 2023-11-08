"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TwoPointConicalGradientNode = exports.TurbulenceNode = exports.SweepGradientNode = exports.ShaderNode = exports.ShaderDeclaration = exports.RadialGradientNode = exports.LinearGradientNode = exports.ImageShaderNode = exports.FractalNoiseNode = exports.ColorNode = void 0;

var _types = require("../../../skia/types");

var _Node = require("../Node");

var _types2 = require("../../types");

var _datatypes = require("../datatypes");

class ShaderDeclaration extends _Node.JsiDeclarationNode {
  constructor(ctx, type, props) {
    super(ctx, _types2.DeclarationType.Shader, type, props);
  }

}

exports.ShaderDeclaration = ShaderDeclaration;

class ShaderNode extends ShaderDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.Shader, props);
  }

  decorate(ctx) {
    this.decorateChildren(ctx);
    const {
      source,
      uniforms,
      ...transform
    } = this.props;
    const m3 = this.Skia.Matrix();
    (0, _datatypes.processTransformProps)(m3, transform);
    const shader = source.makeShaderWithChildren((0, _types.processUniforms)(source, uniforms), ctx.shaders.popAll(), m3);
    ctx.shaders.push(shader);
  }

}

exports.ShaderNode = ShaderNode;

class ImageShaderNode extends ShaderDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.ImageShader, props);
  }

  decorate(ctx) {
    const {
      fit,
      image,
      tx,
      ty,
      fm,
      mm,
      ...imageShaderProps
    } = this.props;

    if (!image) {
      return;
    }

    const rct = (0, _datatypes.getRect)(this.Skia, imageShaderProps);
    const m3 = this.Skia.Matrix();

    if (rct) {
      const rects = (0, _datatypes.fitRects)(fit, {
        x: 0,
        y: 0,
        width: image.width(),
        height: image.height()
      }, rct);
      const [x, y, sx, sy] = (0, _datatypes.rect2rect)(rects.src, rects.dst);
      m3.translate(x.translateX, y.translateY);
      m3.scale(sx.scaleX, sy.scaleY);
    }

    const lm = this.Skia.Matrix();
    lm.concat(m3);
    (0, _datatypes.processTransformProps)(lm, imageShaderProps);
    const shader = image.makeShaderOptions(_types.TileMode[(0, _datatypes.enumKey)(tx)], _types.TileMode[(0, _datatypes.enumKey)(ty)], _types.FilterMode[(0, _datatypes.enumKey)(fm)], _types.MipmapMode[(0, _datatypes.enumKey)(mm)], lm);
    ctx.shaders.push(shader);
  }

}

exports.ImageShaderNode = ImageShaderNode;

class ColorNode extends ShaderDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.ColorShader, props);
  }

  decorate(ctx) {
    const {
      color
    } = this.props;
    const shader = this.Skia.Shader.MakeColor(this.Skia.Color(color));
    ctx.shaders.push(shader);
  }

}

exports.ColorNode = ColorNode;

class TurbulenceNode extends ShaderDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.Turbulence, props);
  }

  decorate(ctx) {
    const {
      freqX,
      freqY,
      octaves,
      seed,
      tileWidth,
      tileHeight
    } = this.props;
    const shader = this.Skia.Shader.MakeTurbulence(freqX, freqY, octaves, seed, tileWidth, tileHeight);
    ctx.shaders.push(shader);
  }

}

exports.TurbulenceNode = TurbulenceNode;

class FractalNoiseNode extends ShaderDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.FractalNoise, props);
  }

  decorate(ctx) {
    const {
      freqX,
      freqY,
      octaves,
      seed,
      tileWidth,
      tileHeight
    } = this.props;
    const shader = this.Skia.Shader.MakeFractalNoise(freqX, freqY, octaves, seed, tileWidth, tileHeight);
    ctx.shaders.push(shader);
  }

}

exports.FractalNoiseNode = FractalNoiseNode;

class LinearGradientNode extends ShaderDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.LinearGradient, props);
  }

  decorate(ctx) {
    const {
      start,
      end
    } = this.props;
    const {
      colors,
      positions,
      mode,
      localMatrix,
      flags
    } = (0, _datatypes.processGradientProps)(this.Skia, this.props);
    const shader = this.Skia.Shader.MakeLinearGradient(start, end, colors, positions ?? null, mode, localMatrix, flags);
    ctx.shaders.push(shader);
  }

}

exports.LinearGradientNode = LinearGradientNode;

class RadialGradientNode extends ShaderDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.RadialGradient, props);
  }

  decorate(ctx) {
    const {
      c,
      r
    } = this.props;
    const {
      colors,
      positions,
      mode,
      localMatrix,
      flags
    } = (0, _datatypes.processGradientProps)(this.Skia, this.props);
    const shader = this.Skia.Shader.MakeRadialGradient(c, r, colors, positions, mode, localMatrix, flags);
    ctx.shaders.push(shader);
  }

}

exports.RadialGradientNode = RadialGradientNode;

class SweepGradientNode extends ShaderDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.SweepGradient, props);
  }

  decorate(ctx) {
    const {
      c,
      start,
      end
    } = this.props;
    const {
      colors,
      positions,
      mode,
      localMatrix,
      flags
    } = (0, _datatypes.processGradientProps)(this.Skia, this.props);
    const shader = this.Skia.Shader.MakeSweepGradient(c.x, c.y, colors, positions, mode, localMatrix, flags, start, end);
    ctx.shaders.push(shader);
  }

}

exports.SweepGradientNode = SweepGradientNode;

class TwoPointConicalGradientNode extends ShaderDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.TwoPointConicalGradient, props);
  }

  decorate(ctx) {
    const {
      startR,
      endR,
      start,
      end
    } = this.props;
    const {
      colors,
      positions,
      mode,
      localMatrix,
      flags
    } = (0, _datatypes.processGradientProps)(this.Skia, this.props);
    const shader = this.Skia.Shader.MakeTwoPointConicalGradient(start, startR, end, endR, colors, positions, mode, localMatrix, flags);
    ctx.shaders.push(shader);
  }

}

exports.TwoPointConicalGradientNode = TwoPointConicalGradientNode;
//# sourceMappingURL=Shaders.js.map