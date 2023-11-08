import { NodeType } from "../../types";
import { JsiDrawingNode } from "../DrawingNode";
import { JsiDeclarationNode } from "../Node";
export class BackdropFilterNode extends JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, NodeType.BackdropFilter, props);
  }

  deriveProps() {
    return null;
  }

  draw(_ref) {
    let {
      canvas,
      declarationCtx
    } = _ref;
    const child = this._children[0];
    let imageFilter = null;

    if (child instanceof JsiDeclarationNode) {
      declarationCtx.save();
      child.decorate(declarationCtx);
      const imgf = declarationCtx.imageFilters.pop();

      if (imgf) {
        imageFilter = imgf;
      } else {
        const cf = declarationCtx.colorFilters.pop();

        if (cf) {
          imageFilter = this.Skia.ImageFilter.MakeColorFilter(cf, null);
        }
      }

      declarationCtx.restore();
    }

    canvas.saveLayer(undefined, null, imageFilter);
    canvas.restore();
  }

}
//# sourceMappingURL=BackdropFilterNode.js.map