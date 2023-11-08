function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { HostObject } from "./Host";
export class JsiSkPathEffect extends HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "PathEffect");

    _defineProperty(this, "dispose", () => {
      this.ref.delete();
    });
  }

}
//# sourceMappingURL=JsiSkPathEffect.js.map