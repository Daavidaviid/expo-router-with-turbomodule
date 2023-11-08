import { BlendMode, ColorChannel, processUniforms, TileMode } from "../../../skia/types";
import { DeclarationType, NodeType } from "../../types";
import { processRadius, enumKey } from "../datatypes";
import { JsiDeclarationNode } from "../Node";
const Black = Float32Array.of(0, 0, 0, 1);

const MakeInnerShadow = (Skia, shadowOnly, dx, dy, sigmaX, sigmaY, color, input) => {
  const sourceGraphic = Skia.ImageFilter.MakeColorFilter(Skia.ColorFilter.MakeBlend(Black, BlendMode.Dst), null);
  const sourceAlpha = Skia.ImageFilter.MakeColorFilter(Skia.ColorFilter.MakeBlend(Black, BlendMode.SrcIn), null);
  const f1 = Skia.ImageFilter.MakeColorFilter(Skia.ColorFilter.MakeBlend(color, BlendMode.SrcOut), null);
  const f2 = Skia.ImageFilter.MakeOffset(dx, dy, f1);
  const f3 = Skia.ImageFilter.MakeBlur(sigmaX, sigmaY, TileMode.Decal, f2);
  const f4 = Skia.ImageFilter.MakeBlend(BlendMode.SrcIn, sourceAlpha, f3);

  if (shadowOnly) {
    return f4;
  }

  return Skia.ImageFilter.MakeCompose(input, Skia.ImageFilter.MakeBlend(BlendMode.SrcOver, sourceGraphic, f4));
};

export class ImageFilterDeclaration extends JsiDeclarationNode {
  constructor(ctx, type, props) {
    super(ctx, DeclarationType.ImageFilter, type, props);
  }

  input(ctx) {
    var _ctx$imageFilters$pop;

    return (_ctx$imageFilters$pop = ctx.imageFilters.pop()) !== null && _ctx$imageFilters$pop !== void 0 ? _ctx$imageFilters$pop : null;
  }

  composeAndPush(ctx, imgf1) {
    ctx.save();
    this.decorateChildren(ctx);
    let imgf2 = ctx.imageFilters.popAllAsOne();
    const cf = ctx.colorFilters.popAllAsOne();
    ctx.restore();

    if (cf) {
      var _imgf;

      imgf2 = this.Skia.ImageFilter.MakeCompose((_imgf = imgf2) !== null && _imgf !== void 0 ? _imgf : null, this.Skia.ImageFilter.MakeColorFilter(cf, null));
    }

    const imgf = imgf2 ? this.Skia.ImageFilter.MakeCompose(imgf1, imgf2) : imgf1;
    ctx.imageFilters.push(imgf);
  }

}
export class OffsetImageFilterNode extends ImageFilterDeclaration {
  constructor(ctx, props) {
    super(ctx, NodeType.OffsetImageFilter, props);
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
export class DisplacementMapImageFilterNode extends ImageFilterDeclaration {
  constructor(ctx, props) {
    super(ctx, NodeType.DisplacementMapImageFilter, props);
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
    const imgf = this.Skia.ImageFilter.MakeDisplacementMap(ColorChannel[enumKey(channelX)], ColorChannel[enumKey(channelY)], scale, map, this.input(ctx));
    ctx.imageFilters.push(imgf);
  }

}
export class BlurImageFilterNode extends ImageFilterDeclaration {
  constructor(ctx, props) {
    super(ctx, NodeType.BlurImageFilter, props);
  }

  decorate(ctx) {
    const {
      mode,
      blur
    } = this.props;
    const sigma = processRadius(this.Skia, blur);
    const imgf = this.Skia.ImageFilter.MakeBlur(sigma.x, sigma.y, TileMode[enumKey(mode)], this.input(ctx));
    this.composeAndPush(ctx, imgf);
  }

}
export class DropShadowImageFilterNode extends ImageFilterDeclaration {
  constructor(ctx, props) {
    super(ctx, NodeType.DropShadowImageFilter, props);
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
export let MorphologyOperator;

(function (MorphologyOperator) {
  MorphologyOperator[MorphologyOperator["Erode"] = 0] = "Erode";
  MorphologyOperator[MorphologyOperator["Dilate"] = 1] = "Dilate";
})(MorphologyOperator || (MorphologyOperator = {}));

export class MorphologyImageFilterNode extends ImageFilterDeclaration {
  constructor(ctx, props) {
    super(ctx, NodeType.MorphologyImageFilter, props);
  }

  decorate(ctx) {
    const {
      operator
    } = this.props;
    const r = processRadius(this.Skia, this.props.radius);
    let imgf;

    if (MorphologyOperator[enumKey(operator)] === MorphologyOperator.Erode) {
      imgf = this.Skia.ImageFilter.MakeErode(r.x, r.y, this.input(ctx));
    } else {
      imgf = this.Skia.ImageFilter.MakeDilate(r.x, r.y, this.input(ctx));
    }

    this.composeAndPush(ctx, imgf);
  }

}
export class BlendImageFilterNode extends ImageFilterDeclaration {
  constructor(ctx, props) {
    super(ctx, NodeType.BlendImageFilter, props);
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
export class RuntimeShaderImageFilterNode extends ImageFilterDeclaration {
  constructor(ctx, props) {
    super(ctx, NodeType.RuntimeShaderImageFilter, props);
  }

  decorate(ctx) {
    const {
      source,
      uniforms
    } = this.props;
    const rtb = this.Skia.RuntimeShaderBuilder(source);

    if (uniforms) {
      processUniforms(source, uniforms, rtb);
    }

    const imgf = this.Skia.ImageFilter.MakeRuntimeShader(rtb, null, this.input(ctx));
    this.composeAndPush(ctx, imgf);
  }

}
//# sourceMappingURL=ImageFilters.js.map