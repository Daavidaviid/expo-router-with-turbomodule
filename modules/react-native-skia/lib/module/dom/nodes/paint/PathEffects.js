import { Path1DEffectStyle } from "../../../skia/types";
import { JsiDeclarationNode } from "../Node";
import { DeclarationType, NodeType } from "../../types";
import { enumKey } from "../datatypes/Enum";
import { processPath } from "../datatypes";
import { composeDeclarations } from "../../types/DeclarationContext";

class PathEffectDeclaration extends JsiDeclarationNode {
  constructor(ctx, type, props) {
    super(ctx, DeclarationType.PathEffect, type, props);
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

export class DiscretePathEffectNode extends PathEffectDeclaration {
  constructor(ctx, props) {
    super(ctx, NodeType.DiscretePathEffect, props);
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
export class Path2DPathEffectNode extends PathEffectDeclaration {
  constructor(ctx, props) {
    super(ctx, NodeType.Path2DPathEffect, props);
  }

  decorate(ctx) {
    const {
      matrix
    } = this.props;
    const path = processPath(this.Skia, this.props.path);
    const pe = this.Skia.PathEffect.MakePath2D(matrix, path);

    if (pe === null) {
      throw new Error("Path2DPathEffectNode: invalid path");
    }

    this.composeAndPush(ctx, pe);
  }

}
export class DashPathEffectNode extends PathEffectDeclaration {
  constructor(ctx, props) {
    super(ctx, NodeType.DashPathEffect, props);
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
export class CornerPathEffectNode extends PathEffectDeclaration {
  constructor(ctx, props) {
    super(ctx, NodeType.CornerPathEffect, props);
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
export class SumPathEffectNode extends PathEffectDeclaration {
  constructor(ctx) {
    super(ctx, NodeType.SumPathEffect, null);
  }

  decorate(ctx) {
    this.decorateChildren(ctx);
    const pes = ctx.pathEffects.popAll();
    const pe = composeDeclarations(pes, this.Skia.PathEffect.MakeSum.bind(this.Skia.PathEffect));
    ctx.pathEffects.push(pe);
  }

}
export class Line2DPathEffectNode extends PathEffectDeclaration {
  constructor(ctx, props) {
    super(ctx, NodeType.Line2DPathEffect, props);
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
export class Path1DPathEffectNode extends PathEffectDeclaration {
  constructor(ctx, props) {
    super(ctx, NodeType.Path1DPathEffect, props);
  }

  decorate(ctx) {
    const {
      advance,
      phase,
      style
    } = this.props;
    const path = processPath(this.Skia, this.props.path);
    const pe = this.Skia.PathEffect.MakePath1D(path, advance, phase, Path1DEffectStyle[enumKey(style)]);

    if (pe === null) {
      throw new Error("Path1DPathEffectNode: could not create path effect");
    }

    this.composeAndPush(ctx, pe);
  }

}
//# sourceMappingURL=PathEffects.js.map