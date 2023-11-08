import { BlurStyle } from "../../../skia/types";
import { JsiDeclarationNode } from "../Node";
import { DeclarationType, NodeType } from "../../types";
import { enumKey } from "../datatypes";
export class BlurMaskFilterNode extends JsiDeclarationNode {
  constructor(ctx, props) {
    super(ctx, DeclarationType.MaskFilter, NodeType.BlurMaskFilter, props);
  }

  decorate(ctx) {
    const {
      style,
      blur,
      respectCTM
    } = this.props;
    const mf = this.Skia.MaskFilter.MakeBlur(BlurStyle[enumKey(style)], blur, respectCTM);
    ctx.maskFilters.push(mf);
  }

}
//# sourceMappingURL=MaskFilters.js.map