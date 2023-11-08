function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { HostObject } from "./Host";
export class JsiSkShader extends HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "Shader");

    _defineProperty(this, "dispose", () => {
      this.ref.delete();
    });
  }

}
//# sourceMappingURL=JsiSkShader.js.map