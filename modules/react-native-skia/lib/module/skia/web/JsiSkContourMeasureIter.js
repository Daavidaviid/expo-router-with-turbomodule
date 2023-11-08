function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { HostObject } from "./Host";
import { JsiSkContourMeasure } from "./JsiSkContourMeasure";
export class JsiSkContourMeasureIter extends HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "ContourMeasureIter");

    _defineProperty(this, "dispose", () => {
      this.ref.delete();
    });
  }

  next() {
    const result = this.ref.next();

    if (result === null) {
      return null;
    }

    return new JsiSkContourMeasure(this.CanvasKit, result);
  }

}
//# sourceMappingURL=JsiSkContourMeasureIter.js.map