function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { HostObject } from "./Host";
export class JsiSkRSXform extends HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "RSXform");

    _defineProperty(this, "dispose", () => {// Do nothing in the web implementation
    });
  }

}
//# sourceMappingURL=JsiSkRSXform.js.map