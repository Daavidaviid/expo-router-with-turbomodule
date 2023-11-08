"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RuntimeShaderImageFilterNode = exports.OffsetImageFilterNode = exports.MorphologyOperator = exports.MorphologyImageFilterNode = exports.ImageFilterDeclaration = exports.DropShadowImageFilterNode = exports.DisplacementMapImageFilterNode = exports.BlurImageFilterNode = exports.BlendImageFilterNode = void 0;

var _types = require("../../../skia/types");

var _types2 = require("../../types");

var _datatypes = require("../datatypes");

var _Node = require("../Node");

const Black = Float32Array.of(0, 0, 0, 1);

const MakeInnerShadow = (Skia, shadowOnly, dx, dy, sigmaX, sigmaY, color, input) => {
  const sourceGraphic = Skia.ImageFilter.MakeColorFilter(Skia.ColorFilter.MakeBlend(Black, _types.BlendMode.Dst), null);
  const sourceAlpha = Skia.ImageFilter.MakeColorFilter(Skia.ColorFilter.MakeBlend(Black, _types.BlendMode.SrcIn), null);
  const f1 = Skia.ImageFilter.MakeColorFilter(Skia.ColorFilter.MakeBlend(color, _types.BlendMode.SrcOut), null);
  const f2 = Skia.ImageFilter.MakeOffset(dx, dy, f1);
  const f3 = Skia.ImageFilter.MakeBlur(sigmaX, sigmaY, _types.TileMode.Decal, f2);
  const f4 = Skia.ImageFilter.MakeBlend(_types.BlendMode.SrcIn, sourceAlpha, f3);

  if (shadowOnly) {
    return f4;
  }

  return Skia.ImageFilter.MakeCompose(input, Skia.ImageFilter.MakeBlend(_types.BlendMode.SrcOver, sourceGraphic, f4));
};

class ImageFilterDeclaration extends _Node.JsiDeclarationNode {
  constructor(ctx, type, props) {
    super(ctx, _types2.DeclarationType.ImageFilter, type, props);
  }

  input(ctx) {
    return ctx.imageFilters.pop() ?? null;
  }

  composeAndPush(ctx, imgf1) {
    ctx.save();
    this.decorateChildren(ctx);
    let imgf2 = ctx.imageFilters.popAllAsOne();
    const cf = ctx.colorFilters.popAllAsOne();
    ctx.restore();

    if (cf) {
      imgf2 = this.Skia.ImageFilter.MakeCompose(imgf2 ?? null, this.Skia.ImageFilter.MakeColorFilter(cf, null));
    }

    const imgf = imgf2 ? this.Skia.ImageFilter.MakeCompose(imgf1, imgf2) : imgf1;
    ctx.imageFilters.push(imgf);
  }

}

exports.ImageFilterDeclaration = ImageFilterDeclaration;

class OffsetImageFilterNode extends ImageFilterDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.OffsetImageFilter, props);
  }

  decorate(ctx) {
    this.decorateChildren(ctx);
    const {
      x,
      y
    } = this.props;
    const imgf = this.Skia.ImageFilter.MakeOffset(x, y, null);
    this.composeAndPush(ctx, imgf);
  }

}

exports.OffsetImageFilterNode = OffsetImageFilterNode;

class DisplacementMapImageFilterNode extends ImageFilterDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.DisplacementMapImageFilter, props);
  }

  decorate(ctx) {
    this.decorateChildren(ctx);
    const {
      channelX,
      channelY,
      scale
    } = this.props;
    const shader = ctx.shaders.pop();

    if (!shader) {
      throw new Error("DisplacementMap expects a shader as child");
    }

    const map = this.Skia.ImageFilter.MakeShader(shader, null);
    const imgf = this.Skia.ImageFilter.MakeDisplacementMap(_types.ColorChannel[(0, _datatypes.enumKey)(channelX)], _types.ColorChannel[(0, _datatypes.enumKey)(channelY)], scale, map, this.input(ctx));
    ctx.imageFilters.push(imgf);
  }

}

exports.DisplacementMapImageFilterNode = DisplacementMapImageFilterNode;

class BlurImageFilterNode extends ImageFilterDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.BlurImageFilter, props);
  }

  decorate(ctx) {
    const {
      mode,
      blur
    } = this.props;
    const sigma = (0, _datatypes.processRadius)(this.Skia, blur);
    const imgf = this.Skia.ImageFilter.MakeBlur(sigma.x, sigma.y, _types.TileMode[(0, _datatypes.enumKey)(mode)], this.input(ctx));
    this.composeAndPush(ctx, imgf);
  }

}

exports.BlurImageFilterNode = BlurImageFilterNode;

class DropShadowImageFilterNode extends ImageFilterDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.DropShadowImageFilter, props);
  }

  decorate(ctx) {
    const {
      dx,
      dy,
      blur,
      shadowOnly,
      color: cl,
      inner
    } = this.props;
    const color = this.Skia.Color(cl);
    let factory;

    if (inner) {
      factory = MakeInnerShadow.bind(null, this.Skia, shadowOnly);
    } else {
      factory = shadowOnly ? this.Skia.ImageFilter.MakeDropShadowOnly.bind(this.Skia.ImageFilter) : this.Skia.ImageFilter.MakeDropShadow.bind(this.Skia.ImageFilter);
    }

    const imgf = factory(dx, dy, blur, blur, color, this.input(ctx));
    this.composeAndPush(ctx, imgf);
  }

}

exports.DropShadowImageFilterNode = DropShadowImageFilterNode;
let MorphologyOperator;
exports.MorphologyOperator = MorphologyOperator;

(function (MorphologyOperator) {
  MorphologyOperator[MorphologyOperator["Erode"] = 0] = "Erode";
  MorphologyOperator[MorphologyOperator["Dilate"] = 1] = "Dilate";
})(MorphologyOperator || (exports.MorphologyOperator = MorphologyOperator = {}));

class MorphologyImageFilterNode extends ImageFilterDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.MorphologyImageFilter, props);
  }

  decorate(ctx) {
    const {
      operator
    } = this.props;
    const r = (0, _datatypes.processRadius)(this.Skia, this.props.radius);
    let imgf;

    if (MorphologyOperator[(0, _datatypes.enumKey)(operator)] === MorphologyOperator.Erode) {
      imgf = this.Skia.ImageFilter.MakeErode(r.x, r.y, this.input(ctx));
    } else {
      imgf = this.Skia.ImageFilter.MakeDilate(r.x, r.y, this.input(ctx));
    }

    this.composeAndPush(ctx, imgf);
  }

}

exports.MorphologyImageFilterNode = MorphologyImageFilterNode;

class BlendImageFilterNode extends ImageFilterDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.BlendImageFilter, props);
  }

  decorate(ctx) {
    const {
      mode
    } = this.props;
    const a = ctx.imageFilters.pop();
    const b = ctx.imageFilters.pop();

    if (!a || !b) {
      throw new Error("BlendImageFilter requires two image filters");
    }

    const imgf = this.Skia.ImageFilter.MakeBlend(mode, a, b);
    this.composeAndPush(ctx, imgf);
  }

}

exports.BlendImageFilterNode = BlendImageFilterNode;

class RuntimeShaderImageFilterNode extends ImageFilterDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.RuntimeShaderImageFilter, props);
  }

  decorate(ctx) {
    const {
      source,
      uniforms
    } = this.props;
    const rtb = this.Skia.RuntimeShaderBuilder(source);

    if (uniforms) {
      (0, _types.processUniforms)(source, uniforms, rtb);
    }

    const imgf = this.Skia.ImageFilter.MakeRuntimeShader(rtb, null, this.input(ctx));
    this.composeAndPush(ctx, imgf);
  }

}

exports.RuntimeShaderImageFilterNode = RuntimeShaderImageFilterNode;
//# sourceMappingURL=ImageFilters.js.map