import { SkiaBaseWebView } from "./SkiaBaseWebView";
export class SkiaPictureView extends SkiaBaseWebView {
  constructor(props) {
    super(props);
  }

  renderInCanvas(canvas) {
    if (this.props.picture) {
      canvas.drawPicture(this.props.picture);
    }
  }

}
//# sourceMappingURL=SkiaPictureView.web.js.map