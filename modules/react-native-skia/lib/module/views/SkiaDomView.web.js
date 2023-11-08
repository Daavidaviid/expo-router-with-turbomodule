import { Skia } from "../skia";
import { JsiDrawingContext } from "../dom/types/DrawingContext";
import { isValue } from "../renderer/processors/Animations/Animations";
import { SkiaBaseWebView } from "./SkiaBaseWebView";
export class SkiaDomView extends SkiaBaseWebView {
  constructor(props) {
    super(props);
  }

  renderInCanvas(canvas, touches) {
    if (this.props.onTouch) {
      this.props.onTouch([touches]);
    }

    if (this.props.onSize) {
      const {
        width,
        height
      } = this.getSize();

      if (isValue(this.props.onSize)) {
        this.props.onSize.current = {
          width,
          height
        };
      } else {
        this.props.onSize.value = {
          width,
          height
        };
      }
    }

    if (this.props.root) {
      const ctx = new JsiDrawingContext(Skia, canvas);
      this.props.root.render(ctx);
    }
  }

}
//# sourceMappingURL=SkiaDomView.web.js.map