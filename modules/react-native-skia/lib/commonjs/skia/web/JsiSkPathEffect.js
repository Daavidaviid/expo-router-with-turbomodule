"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsiSkPathEffect = void 0;

var _Host = require("./Host");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class JsiSkPathEffect extends _Host.HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "PathEffect");

    _defineProperty(this, "dispose", () => {
      this.ref.delete();
    });
  }

}

exports.JsiSkPathEffect = JsiSkPathEffect;
//# sourceMappingURL=JsiSkPathEffect.js.map