function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { HostObject } from "./Host";
export class JsiSkData extends HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "Data");

    _defineProperty(this, "dispose", () => {// Not implemented in data - since data is a raw ArrayBuffer
    });
  }

}
//# sourceMappingURL=JsiSkData.js.map