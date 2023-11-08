"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsiDrawingContext = void 0;

var _types = require("../../skia/types");

var _Enum = require("../nodes/datatypes/Enum");

var _Node = require("../nodes/Node");

var _DeclarationContext = require("./DeclarationContext");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class JsiDrawingContext {
  constructor(Skia, canvas) {
    this.Skia = Skia;
    this.canvas = canvas;

    _defineProperty(this, "paints", void 0);

    _defineProperty(this, "declarationCtx", void 0);

    const paint = this.Skia.Paint();
    this.paints = [paint];
    this.declarationCtx = new _DeclarationContext.DeclarationContext(Skia);
  }

  get paint() {
    return this.paints[this.paints.length - 1];
  }

  save() {
    const childPaint = this.paint.copy();
    this.paints.push(childPaint);
  }

  restore() {
    this.paints.pop();
  }

  saveAndConcat(node, cache) {
    if (cache) {
      this.paints.push(cache);
      return true;
    }

    const paint = new ConcatablePaint(this.Skia, this.declarationCtx, node);

    if (!paint.isPristine()) {
      this.save();
      paint.concatTo(this.paint);
      return true;
    }

    return false;
  }

}

exports.JsiDrawingContext = JsiDrawingContext;

class ConcatablePaint {
  constructor(Skia, declCtx, node) {
    _defineProperty(this, "pristine", true);

    _defineProperty(this, "_color", void 0);

    _defineProperty(this, "_strokeWidth", void 0);

    _defineProperty(this, "_blendMode", void 0);

    _defineProperty(this, "_style", void 0);

    _defineProperty(this, "_strokeJoin", void 0);

    _defineProperty(this, "_strokeCap", void 0);

    _defineProperty(this, "_strokeMiter", void 0);

    _defineProperty(this, "_opacity", 1);

    _defineProperty(this, "_antiAlias", void 0);

    _defineProperty(this, "_dither", void 0);

    _defineProperty(this, "_imageFilter", void 0);

    _defineProperty(this, "_shader", void 0);

    _defineProperty(this, "_pathEffect", void 0);

    _defineProperty(this, "_colorFilter", void 0);

    _defineProperty(this, "_maskFilter", void 0);

    const props = node.getProps();
    const children = node.children();
    this.setColor(props.color !== undefined ? Skia.Color(props.color) : props.color);
    this.setStrokeWidth(props.strokeWidth);
    this.setBlendMode(props.blendMode);
    this.setStyle(props.style);
    this.setStrokeJoin(props.strokeJoin);
    this.setStrokeCap(props.strokeCap);
    this.setStrokeMiter(props.strokeMiter);
    this.setOpacity(props.opacity);
    this.setAntiAlias(props.antiAlias);
    this.setDither(props.dither);
    declCtx.save();
    children.forEach(child => {
      if (child instanceof _Node.JsiDeclarationNode) {
        child.decorate(declCtx);
      }
    });
    const colorFilter = declCtx.colorFilters.popAllAsOne();
    const imageFilter = declCtx.imageFilters.popAllAsOne();
    const shader = declCtx.shaders.pop();
    const maskFilter = declCtx.maskFilters.pop();
    const pathEffect = declCtx.pathEffects.popAllAsOne();
    declCtx.restore();

    if (imageFilter) {
      this.setImageFilter(imageFilter);
    }

    if (shader) {
      this.setShader(shader);
    }

    if (pathEffect) {
      this.setPathEffect(pathEffect);
    }

    if (colorFilter) {
      this.setColorFilter(colorFilter);
    }

    if (maskFilter) {
      this.setMaskFilter(maskFilter);
    }
  }

  enum(value, key) {
    if (key !== undefined) {
      return value[(0, _Enum.enumKey)(key)];
    }

    return undefined;
  }

  setValue(key, value) {
    if (value !== undefined) {
      this[key] = value;
      this.pristine = false;
    }
  }

  setColor(color) {
    this.setValue("_color", color);
  }

  getColor() {
    return this._color;
  }

  setStrokeWidth(strokeWidth) {
    this.setValue("_strokeWidth", strokeWidth);
  }

  getStrokeWidth() {
    return this._strokeWidth;
  }

  setBlendMode(blendMode) {
    this.setValue("_blendMode", this.enum(_types.BlendMode, blendMode));
  }

  getBlendMode() {
    return this._blendMode;
  }

  setStyle(style) {
    this.setValue("_style", this.enum(_types.PaintStyle, style));
  }

  getStyle() {
    return this._style;
  }

  setStrokeJoin(strokeJoin) {
    this.setValue("_strokeJoin", this.enum(_types.StrokeJoin, strokeJoin));
  }

  getStrokeJoin() {
    return this._strokeJoin;
  }

  setStrokeCap(strokeCap) {
    this.setValue("_strokeCap", this.enum(_types.StrokeCap, strokeCap));
  }

  getStrokeCap() {
    return this._strokeCap;
  }

  setStrokeMiter(strokeMiter) {
    this.setValue("_strokeMiter", strokeMiter);
  }

  getStrokeMiter() {
    return this._strokeMiter;
  }

  setOpacity(opacity) {
    this.setValue("_opacity", opacity);
  }

  getOpacity() {
    return this._opacity;
  }

  setAntiAlias(antiAlias) {
    this.setValue("_antiAlias", antiAlias);
  }

  getAntiAlias() {
    return this._antiAlias;
  }

  setDither(dither) {
    this.setValue("_dither", dither);
  }

  getDither() {
    return this._dither;
  }

  setImageFilter(imageFilter) {
    this.setValue("_imageFilter", imageFilter);
  }

  getImageFilter() {
    return this._imageFilter;
  }

  setShader(shader) {
    this.setValue("_shader", shader);
  }

  getShader() {
    return this._shader;
  }

  setPathEffect(pathEffect) {
    this.setValue("_pathEffect", pathEffect);
  }

  getPathEffect() {
    return this._pathEffect;
  }

  setColorFilter(colorFilter) {
    this.setValue("_colorFilter", colorFilter);
  }

  getColorFilter() {
    return this._colorFilter;
  }

  setMaskFilter(maskFilter) {
    this.setValue("_maskFilter", maskFilter);
  }

  getMaskFilter() {
    return this._maskFilter;
  }

  isPristine() {
    return this.pristine;
  }

  concatTo(paint) {
    if (this._opacity !== undefined) {
      paint.setAlphaf(paint.getAlphaf() * this._opacity);
    }

    if (this._color !== undefined) {
      const currentOpacity = paint.getAlphaf();
      paint.setShader(null);
      paint.setColor(this._color);
      paint.setAlphaf(currentOpacity * paint.getAlphaf());
    }

    if (this._strokeWidth !== undefined) {
      paint.setStrokeWidth(this._strokeWidth);
    }

    if (this._blendMode !== undefined) {
      paint.setBlendMode(this._blendMode);
    }

    if (this._style !== undefined) {
      paint.setStyle(this._style);
    }

    if (this._strokeJoin !== undefined) {
      paint.setStrokeJoin(this._strokeJoin);
    }

    if (this._strokeCap !== undefined) {
      paint.setStrokeCap(this._strokeCap);
    }

    if (this._strokeMiter !== undefined) {
      paint.setStrokeMiter(this._strokeMiter);
    }

    if (this._antiAlias !== undefined) {
      paint.setAntiAlias(this._antiAlias);
    }

    if (this._dither !== undefined) {
      paint.setDither(this._dither);
    }

    if (this._imageFilter !== undefined) {
      paint.setImageFilter(this._imageFilter);
    }

    if (this._shader !== undefined) {
      paint.setShader(this._shader);
    }

    if (this._pathEffect !== undefined) {
      paint.setPathEffect(this._pathEffect);
    }

    if (this._colorFilter !== undefined) {
      paint.setColorFilter(this._colorFilter);
    }

    if (this._maskFilter !== undefined) {
      paint.setMaskFilter(this._maskFilter);
    }
  }

}
//# sourceMappingURL=DrawingContext.js.map