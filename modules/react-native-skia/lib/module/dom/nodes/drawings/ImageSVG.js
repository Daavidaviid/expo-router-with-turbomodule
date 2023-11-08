import { NodeType } from "../../types";
import { JsiDrawingNode } from "../DrawingNode";
export class ImageSVGNode extends JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, NodeType.ImageSVG, props);
  }

  deriveProps() {
    if (this.props.rect) {
      return this.props.rect;
    }

    const {
      x,
      y,
      width,
      height
    } = this.props;
    return {
      x,
      y,
      width,
      height
    };
  }

  draw(_ref) {
    let {
      canvas
    } = _ref;
    const {
      svg
    } = this.props;

    if (!this.derived) {
      throw new Error("ImageSVGNode: derived props unresolved");
    }

    const {
      x,
      y,
      width,
      height
    } = this.derived;

    if (svg === null) {
      return;
    }

    canvas.save();

    if (x && y) {
      canvas.translate(x, y);
    }

    canvas.drawSvg(svg, width, height);
    canvas.restore();
  }

}
//# sourceMappingURL=ImageSVG.js.map