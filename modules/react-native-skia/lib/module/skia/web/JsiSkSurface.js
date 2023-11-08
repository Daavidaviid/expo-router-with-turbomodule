function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { HostObject } from "./Host";
import { JsiSkCanvas } from "./JsiSkCanvas";
import { JsiSkImage } from "./JsiSkImage";
import { JsiSkRect } from "./JsiSkRect";
export class JsiSkSurface extends HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "Surface");

    _defineProperty(this, "dispose", () => {
      this.ref.delete();
    });
  }

  flush() {
    this.ref.flush();
  }

  getCanvas() {
    return new JsiSkCanvas(this.CanvasKit, this.ref.getCanvas());
  }

  makeImageSnapshot(bounds) {
    const image = this.ref.makeImageSnapshot(bounds ? Array.from(JsiSkRect.fromValue(this.CanvasKit, bounds)) : undefined);
    return new JsiSkImage(this.CanvasKit, image);
  }

}
//# sourceMappingURL=JsiSkSurface.js.map