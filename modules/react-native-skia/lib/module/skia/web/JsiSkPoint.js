function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { BaseHostObject } from "./Host";
export class JsiSkPoint extends BaseHostObject {
  static fromValue(point) {
    if (point instanceof JsiSkPoint) {
      return point.ref;
    }

    return new Float32Array([point.x, point.y]);
  }

  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "Point");

    _defineProperty(this, "dispose", () => {// Float32Array
    });
  }

  get x() {
    return this.ref[0];
  }

  get y() {
    return this.ref[1];
  }

}
//# sourceMappingURL=JsiSkPoint.js.map