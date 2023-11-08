function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { HostObject } from "./Host";
import { JsiSkCanvas } from "./JsiSkCanvas";
import { JsiSkPicture } from "./JsiSkPicture";
import { JsiSkRect } from "./JsiSkRect";
export class JsiSkPictureRecorder extends HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "PictureRecorder");

    _defineProperty(this, "dispose", () => {
      this.ref.delete();
    });
  }

  beginRecording(bounds) {
    return new JsiSkCanvas(this.CanvasKit, this.ref.beginRecording(JsiSkRect.fromValue(this.CanvasKit, bounds)));
  }

  finishRecordingAsPicture() {
    return new JsiSkPicture(this.CanvasKit, this.ref.finishRecordingAsPicture());
  }

}
//# sourceMappingURL=JsiSkPictureRecorder.js.map