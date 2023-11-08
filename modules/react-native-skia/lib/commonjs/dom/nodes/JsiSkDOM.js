"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsiSkDOM = void 0;

var _HostComponents = require("../../renderer/HostComponents");

var _drawings = require("./drawings");

var _paint = require("./paint");

var _ColorFilters = require("./paint/ColorFilters");

var _Shaders = require("./paint/Shaders");

var _ImageFilters = require("./paint/ImageFilters");

var _GroupNode = require("./GroupNode");

var _PaintNode = require("./PaintNode");

var _LayerNode = require("./LayerNode");

class JsiSkDOM {
  constructor(ctx) {
    this.ctx = ctx;
  }

  Layer(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.LayerNode(props ?? {}) : new _LayerNode.LayerNode(this.ctx, props ?? {});
  }

  Group(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.GroupNode(props ?? {}) : new _GroupNode.GroupNode(this.ctx, props ?? {});
  }

  Paint(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.PaintNode(props ?? {}) : new _PaintNode.PaintNode(this.ctx, props);
  } // Drawings


  Fill(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.FillNode(props ?? {}) : new _drawings.FillNode(this.ctx, props);
  }

  Image(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.ImageNode(props ?? {}) : new _drawings.ImageNode(this.ctx, props);
  }

  Circle(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.CircleNode(props ?? {}) : new _drawings.CircleNode(this.ctx, props);
  }

  Path(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.PathNode(props ?? {}) : new _drawings.PathNode(this.ctx, props);
  }

  CustomDrawing(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.CustomDrawingNode(props ?? {}) : new _drawings.CustomDrawingNode(this.ctx, props);
  }

  Line(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.LineNode(props ?? {}) : new _drawings.LineNode(this.ctx, props);
  }

  Oval(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.OvalNode(props ?? {}) : new _drawings.OvalNode(this.ctx, props);
  }

  Patch(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.PatchNode(props ?? {}) : new _drawings.PatchNode(this.ctx, props);
  }

  Points(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.PointsNode(props ?? {}) : new _drawings.PointsNode(this.ctx, props);
  }

  Rect(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.RectNode(props) : new _drawings.RectNode(this.ctx, props);
  }

  RRect(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.RRectNode(props) : new _drawings.RRectNode(this.ctx, props);
  }

  Vertices(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.VerticesNode(props) : new _drawings.VerticesNode(this.ctx, props);
  }

  Text(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.TextNode(props) : new _drawings.TextNode(this.ctx, props);
  }

  TextPath(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.TextPathNode(props) : new _drawings.TextPathNode(this.ctx, props);
  }

  TextBlob(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.TextBlobNode(props) : new _drawings.TextBlobNode(this.ctx, props);
  }

  Glyphs(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.GlyphsNode(props) : new _drawings.GlyphsNode(this.ctx, props);
  }

  DiffRect(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.DiffRectNode(props) : new _drawings.DiffRectNode(this.ctx, props);
  }

  Picture(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.PictureNode(props) : new _drawings.PictureNode(this.ctx, props);
  }

  ImageSVG(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.ImageSVGNode(props) : new _drawings.ImageSVGNode(this.ctx, props);
  } // BlurMaskFilters


  BlurMaskFilter(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.BlurMaskFilterNode(props) : new _paint.BlurMaskFilterNode(this.ctx, props);
  } // ImageFilters


  BlendImageFilter(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.BlendImageFilterNode(props) : new _paint.BlendImageFilterNode(this.ctx, props);
  }

  DropShadowImageFilter(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.DropShadowImageFilterNode(props) : new _paint.DropShadowImageFilterNode(this.ctx, props);
  }

  DisplacementMapImageFilter(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.DisplacementMapImageFilterNode(props) : new _paint.DisplacementMapImageFilterNode(this.ctx, props);
  }

  BlurImageFilter(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.BlurImageFilterNode(props) : new _paint.BlurImageFilterNode(this.ctx, props);
  }

  OffsetImageFilter(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.OffsetImageFilterNode(props) : new _paint.OffsetImageFilterNode(this.ctx, props);
  }

  MorphologyImageFilter(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.MorphologyImageFilterNode(props) : new _ImageFilters.MorphologyImageFilterNode(this.ctx, props);
  }

  RuntimeShaderImageFilter(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.RuntimeShaderImageFilterNode(props) : new _paint.RuntimeShaderImageFilterNode(this.ctx, props);
  } // Color Filters


  MatrixColorFilter(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.MatrixColorFilterNode(props) : new _ColorFilters.MatrixColorFilterNode(this.ctx, props);
  }

  BlendColorFilter(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.BlendColorFilterNode(props) : new _ColorFilters.BlendColorFilterNode(this.ctx, props);
  }

  LumaColorFilter() {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.LumaColorFilterNode() : new _ColorFilters.LumaColorFilterNode(this.ctx);
  }

  LinearToSRGBGammaColorFilter() {
    return global.SkiaDomApi && global.SkiaDomApi.LinearToSRGBGammaColorFilterNode ? global.SkiaDomApi.LinearToSRGBGammaColorFilterNode() : new _ColorFilters.LinearToSRGBGammaColorFilterNode(this.ctx);
  }

  SRGBToLinearGammaColorFilter() {
    return global.SkiaDomApi && global.SkiaDomApi.SRGBToLinearGammaColorFilterNode ? global.SkiaDomApi.SRGBToLinearGammaColorFilterNode() : new _ColorFilters.SRGBToLinearGammaColorFilterNode(this.ctx);
  }

  LerpColorFilter(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.LerpColorFilterNode(props) : new _ColorFilters.LerpColorFilterNode(this.ctx, props);
  } // Shaders


  Shader(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.ShaderNode(props) : new _Shaders.ShaderNode(this.ctx, props);
  }

  ImageShader(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.ImageShaderNode(props) : new _Shaders.ImageShaderNode(this.ctx, props);
  }

  ColorShader(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.ColorShaderNode(props) : new _Shaders.ColorNode(this.ctx, props);
  }

  SweepGradient(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.SweepGradientNode(props) : new _Shaders.SweepGradientNode(this.ctx, props);
  }

  Turbulence(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.TurbulenceNode(props) : new _Shaders.TurbulenceNode(this.ctx, props);
  }

  FractalNoise(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.FractalNoiseNode(props) : new _Shaders.FractalNoiseNode(this.ctx, props);
  }

  LinearGradient(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.LinearGradientNode(props) : new _Shaders.LinearGradientNode(this.ctx, props);
  }

  RadialGradient(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.RadialGradientNode(props) : new _Shaders.RadialGradientNode(this.ctx, props);
  }

  TwoPointConicalGradient(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.TwoPointConicalGradientNode(props) : new _Shaders.TwoPointConicalGradientNode(this.ctx, props);
  } // Path Effects


  CornerPathEffect(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.CornerPathEffectNode(props) : new _paint.CornerPathEffectNode(this.ctx, props);
  }

  DiscretePathEffect(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.DiscretePathEffectNode(props) : new _paint.DiscretePathEffectNode(this.ctx, props);
  }

  DashPathEffect(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.DashPathEffectNode(props) : new _paint.DashPathEffectNode(this.ctx, props);
  }

  Path1DPathEffect(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.Path1DPathEffectNode(props) : new _paint.Path1DPathEffectNode(this.ctx, props);
  }

  Path2DPathEffect(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.Path2DPathEffectNode(props) : new _paint.Path2DPathEffectNode(this.ctx, props);
  }

  SumPathEffect() {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.SumPathEffectNode() : new _paint.SumPathEffectNode(this.ctx);
  }

  Line2DPathEffect(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.Line2DPathEffectNode(props) : new _paint.Line2DPathEffectNode(this.ctx, props);
  }

  Blend(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.BlendNode(props) : new _paint.BlendNode(this.ctx, props);
  }

  BackdropFilter(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.BackdropFilterNode(props) : new _drawings.BackdropFilterNode(this.ctx, props);
  }

  Box(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.BoxNode(props) : new _drawings.BoxNode(this.ctx, props);
  }

  BoxShadow(props) {
    return _HostComponents.NATIVE_DOM ? global.SkiaDomApi.BoxShadowNode(props) : new _drawings.BoxShadowNode(this.ctx, props);
  }

}

exports.JsiSkDOM = JsiSkDOM;
//# sourceMappingURL=JsiSkDOM.js.map