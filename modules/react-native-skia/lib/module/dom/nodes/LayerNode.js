import { NodeType } from "../types";
import { JsiRenderNode } from "./RenderNode";
import { JsiDeclarationNode } from "./Node";
export class LayerNode extends JsiRenderNode {
  constructor(ctx, props) {
    super(ctx, NodeType.Layer, props);
  }

  renderNode(ctx) {
    let hasLayer = false;
    const [layer, ...children] = this.children();

    if (layer instanceof JsiDeclarationNode) {
      const declCtx = ctx.declarationCtx;
      declCtx.save();
      layer.decorate(declCtx);
      const paint = declCtx.paints.pop();
      declCtx.restore();

      if (paint) {
        hasLayer = true;
        ctx.canvas.saveLayer(paint);
      }
    }

    children.map(child => {
      if (child instanceof JsiRenderNode) {
        child.render(ctx);
      }
    });

    if (hasLayer) {
      ctx.canvas.restore();
    }
  }

}
//# sourceMappingURL=LayerNode.js.map