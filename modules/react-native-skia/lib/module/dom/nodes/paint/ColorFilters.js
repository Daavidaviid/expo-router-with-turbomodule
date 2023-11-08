import { BlendMode } from "../../../skia/types";
import { JsiDeclarationNode } from "../Node";
import { DeclarationType, NodeType } from "../../types";
import { enumKey } from "../datatypes/Enum";
export class ColorFilterDeclaration extends JsiDeclarationNode {
  constructor(ctx, type, props) {
    super(ctx, DeclarationType.ColorFilter, type, props);
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
export class MatrixColorFilterNode extends ColorFilterDeclaration {
  constructor(ctx, props) {
    super(ctx, NodeType.MatrixColorFilter, props);
  }

  decorate(ctx) {
    const {
      matrix
    } = this.props;
    const cf = this.Skia.ColorFilter.MakeMatrix(matrix);
    this.composeAndPush(ctx, cf);
  }

}
export class BlendColorFilterNode extends ColorFilterDeclaration {
  constructor(ctx, props) {
    super(ctx, NodeType.BlendColorFilter, props);
  }

  decorate(ctx) {
    const {
      mode
    } = this.props;
    const color = this.Skia.Color(this.props.color);
    const cf = this.Skia.ColorFilter.MakeBlend(color, BlendMode[enumKey(mode)]);
    this.composeAndPush(ctx, cf);
  }

}
export class LinearToSRGBGammaColorFilterNode extends ColorFilterDeclaration {
  constructor(ctx) {
    super(ctx, NodeType.LinearToSRGBGammaColorFilter, null);
  }

  decorate(ctx) {
    const cf = this.Skia.ColorFilter.MakeLinearToSRGBGamma();
    this.composeAndPush(ctx, cf);
  }

}
export class SRGBToLinearGammaColorFilterNode extends ColorFilterDeclaration {
  constructor(ctx) {
    super(ctx, NodeType.SRGBToLinearGammaColorFilter, null);
  }

  decorate(ctx) {
    const cf = this.Skia.ColorFilter.MakeSRGBToLinearGamma();
    this.composeAndPush(ctx, cf);
  }

}
export class LumaColorFilterNode extends ColorFilterDeclaration {
  constructor(ctx) {
    super(ctx, NodeType.LumaColorFilter, null);
  }

  decorate(ctx) {
    const cf = this.Skia.ColorFilter.MakeLumaColorFilter();
    this.composeAndPush(ctx, cf);
  }

}
export class LerpColorFilterNode extends ColorFilterDeclaration {
  constructor(ctx, props) {
    super(ctx, NodeType.LerpColorFilter, props);
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
//# sourceMappingURL=ColorFilters.js.map