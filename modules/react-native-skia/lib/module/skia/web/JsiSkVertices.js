function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { HostObject } from "./Host";
import { JsiSkRect } from "./JsiSkRect";
export class JsiSkVertices extends HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "Vertices");

    _defineProperty(this, "dispose", () => {
      this.ref.delete();
    });
  }

  bounds() {
    return new JsiSkRect(this.CanvasKit, this.ref.bounds());
  }

  uniqueID() {
    return this.ref.uniqueID();
  }

}
//# sourceMappingURL=JsiSkVertices.js.map