function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { HostObject } from "./Host";
export class JsiSkColorFilter extends HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "ColorFilter");

    _defineProperty(this, "dispose", () => {
      this.ref.delete();
    });
  }

}
//# sourceMappingURL=JsiSkColorFilter.js.map