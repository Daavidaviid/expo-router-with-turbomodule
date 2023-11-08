"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsiRenderNode = void 0;

var _types = require("../../skia/types");

var _datatypes = require("./datatypes");

var _Node = require("./Node");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const paintProps = ["color", "strokeWidth", "blendMode", "strokeCap", "strokeJoin", "strokeMiter", "style", "antiAlias", "dither", "opacity"];

class JsiRenderNode extends _Node.JsiNode {
  constructor(ctx, type, props) {
    super(ctx, type, props);

    _defineProperty(this, "paintCache", null);

    _defineProperty(this, "matrix", void 0);

    _defineProperty(this, "clipRect", void 0);

    _defineProperty(this, "clipRRect", void 0);

    _defineProperty(this, "clipPath", void 0);

    this.matrix = this.Skia.Matrix();
    this.onPropChange();
  }

  setProps(props) {
    super.setProps(props);
    this.onPropChange();
  }

  setProp(key, value) {
    const hasChanged = super.setProp(key, value);

    if (hasChanged) {
      this.onPropChange();

      if (paintProps.includes(key)) {
        this.paintCache = null;
      }
    }

    return hasChanged;
  }

  onPropChange() {
    this.matrix.identity();
    this.clipPath = undefined;
    this.clipRect = undefined;
    this.clipRRect = undefined;
    this.computeMatrix();
    this.computeClip();
  }

  addChild(child) {
    if (child instanceof _Node.JsiDeclarationNode) {
      child.setInvalidate(() => {
        this.paintCache = null;
      });
    }

    super.addChild(child);
  }

  insertChildBefore(child, before) {
    if (child instanceof _Node.JsiDeclarationNode) {
      child.setInvalidate(() => {
        this.paintCache = null;
      });
    }

    super.insertChildBefore(child, before);
  }

  computeClip() {
    const {
      clip
    } = this.props;

    if (clip) {
      if ((0, _datatypes.isPathDef)(clip)) {
        this.clipPath = (0, _datatypes.processPath)(this.Skia, clip);
      } else if ((0, _types.isRRect)(clip)) {
        this.clipRRect = clip;
      } else {
        this.clipRect = clip;
      }
    }
  }

  computeMatrix() {
    (0, _datatypes.processTransformProps)(this.matrix, this.props);
  }

  render(ctx) {
    const {
      invertClip,
      layer,
      matrix,
      transform
    } = this.props;
    const {
      canvas
    } = ctx;
    const parentPaint = ctx.paint;
    const cache = this.paintCache !== null && this.paintCache.parent === ctx.paint ? this.paintCache.child : undefined;
    const shouldRestore = ctx.saveAndConcat(this, cache);
    const hasTransform = matrix !== undefined || transform !== undefined;
    const hasClip = this.clipRect !== undefined || this.clipPath !== undefined || this.clipRRect !== undefined;
    const shouldSave = hasTransform || hasClip || !!layer;
    const op = invertClip ? _types.ClipOp.Difference : _types.ClipOp.Intersect;

    if (shouldSave) {
      if (layer) {
        if (typeof layer === "boolean") {
          canvas.saveLayer();
        } else {
          canvas.saveLayer(layer);
        }
      } else {
        canvas.save();
      }
    }

    if (this.matrix) {
      canvas.concat(this.matrix);
    }

    if (this.clipRect) {
      canvas.clipRect(this.clipRect, op, true);
    } else if (this.clipRRect) {
      canvas.clipRRect(this.clipRRect, op, true);
    } else if (this.clipPath) {
      canvas.clipPath(this.clipPath, op, true);
    }

    this.renderNode(ctx);

    if (shouldSave) {
      canvas.restore();
    }

    if (shouldRestore) {
      this.paintCache = {
        parent: parentPaint,
        child: ctx.paint
      };
      ctx.restore();
    }
  }

}

exports.JsiRenderNode = JsiRenderNode;
//# sourceMappingURL=RenderNode.js.map