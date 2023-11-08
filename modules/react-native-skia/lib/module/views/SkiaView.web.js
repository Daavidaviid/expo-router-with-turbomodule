import { SkiaBaseWebView } from "./SkiaBaseWebView";
export class SkiaView extends SkiaBaseWebView {
  constructor(props) {
    super(props);
  }

  renderInCanvas(canvas, touches) {
    if (this.props.onDraw) {
      const info = {
        height: this.height,
        width: this.width,
        timestamp: Date.now(),
        touches: touches.map(t => [t])
      };
      this.props.onDraw(canvas, info);
    }
  }

}
//# sourceMappingURL=SkiaView.web.js.map