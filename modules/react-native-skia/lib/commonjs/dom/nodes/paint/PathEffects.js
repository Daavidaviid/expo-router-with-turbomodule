"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SumPathEffectNode = exports.Path2DPathEffectNode = exports.Path1DPathEffectNode = exports.Line2DPathEffectNode = exports.DiscretePathEffectNode = exports.DashPathEffectNode = exports.CornerPathEffectNode = void 0;

var _types = require("../../../skia/types");

var _Node = require("../Node");

var _types2 = require("../../types");

var _Enum = require("../datatypes/Enum");

var _datatypes = require("../datatypes");

var _DeclarationContext = require("../../types/DeclarationContext");

class PathEffectDeclaration extends _Node.JsiDeclarationNode {
  constructor(ctx, type, props) {
    super(ctx, _types2.DeclarationType.PathEffect, type, props);
  }

  composeAndPush(ctx, pe1) {
    ctx.save();
    this.decorateChildren(ctx);
    const pe2 = ctx.pathEffects.popAllAsOne();
    ctx.restore();
    const pe = pe2 ? this.Skia.PathEffect.MakeCompose(pe1, pe2) : pe1;
    ctx.pathEffects.push(pe);
  }

}

class DiscretePathEffectNode extends PathEffectDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.DiscretePathEffect, props);
  }

  decorate(ctx) {
    const {
      length,
      deviation,
      seed
    } = this.props;
    const pe = this.Skia.PathEffect.MakeDiscrete(length, deviation, seed);
    this.composeAndPush(ctx, pe);
  }

}

exports.DiscretePathEffectNode = DiscretePathEffectNode;

class Path2DPathEffectNode extends PathEffectDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.Path2DPathEffect, props);
  }

  decorate(ctx) {
    const {
      matrix
    } = this.props;
    const path = (0, _datatypes.processPath)(this.Skia, this.props.path);
    const pe = this.Skia.PathEffect.MakePath2D(matrix, path);

    if (pe === null) {
      throw new Error("Path2DPathEffectNode: invalid path");
    }

    this.composeAndPush(ctx, pe);
  }

}

exports.Path2DPathEffectNode = Path2DPathEffectNode;

class DashPathEffectNode extends PathEffectDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.DashPathEffect, props);
  }

  decorate(ctx) {
    const {
      intervals,
      phase
    } = this.props;
    const pe = this.Skia.PathEffect.MakeDash(intervals, phase);
    this.composeAndPush(ctx, pe);
  }

}

exports.DashPathEffectNode = DashPathEffectNode;

class CornerPathEffectNode extends PathEffectDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.CornerPathEffect, props);
  }

  decorate(ctx) {
    const {
      r
    } = this.props;
    const pe = this.Skia.PathEffect.MakeCorner(r);

    if (pe === null) {
      throw new Error("CornerPathEffectNode: couldn't create path effect");
    }

    this.composeAndPush(ctx, pe);
  }

}

exports.CornerPathEffectNode = CornerPathEffectNode;

class SumPathEffectNode extends PathEffectDeclaration {
  constructor(ctx) {
    super(ctx, _types2.NodeType.SumPathEffect, null);
  }

  decorate(ctx) {
    this.decorateChildren(ctx);
    const pes = ctx.pathEffects.popAll();
    const pe = (0, _DeclarationContext.composeDeclarations)(pes, this.Skia.PathEffect.MakeSum.bind(this.Skia.PathEffect));
    ctx.pathEffects.push(pe);
  }

}

exports.SumPathEffectNode = SumPathEffectNode;

class Line2DPathEffectNode extends PathEffectDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.Line2DPathEffect, props);
  }

  decorate(ctx) {
    const {
      width,
      matrix
    } = this.props;
    const pe = this.Skia.PathEffect.MakeLine2D(width, matrix);

    if (pe === null) {
      throw new Error("Line2DPathEffectNode: could not create path effect");
    }

    this.composeAndPush(ctx, pe);
  }

}

exports.Line2DPathEffectNode = Line2DPathEffectNode;

class Path1DPathEffectNode extends PathEffectDeclaration {
  constructor(ctx, props) {
    super(ctx, _types2.NodeType.Path1DPathEffect, props);
  }

  decorate(ctx) {
    const {
      advance,
      phase,
      style
    } = this.props;
    const path = (0, _datatypes.processPath)(this.Skia, this.props.path);
    const pe = this.Skia.PathEffect.MakePath1D(path, advance, phase, _types.Path1DEffectStyle[(0, _Enum.enumKey)(style)]);

    if (pe === null) {
      throw new Error("Path1DPathEffectNode: could not create path effect");
    }

    this.composeAndPush(ctx, pe);
  }

}

exports.Path1DPathEffectNode = Path1DPathEffectNode;
//# sourceMappingURL=PathEffects.js.map