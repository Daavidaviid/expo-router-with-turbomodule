"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsiSkPoint = void 0;

var _Host = require("./Host");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class JsiSkPoint extends _Host.BaseHostObject {
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

exports.JsiSkPoint = JsiSkPoint;
//# sourceMappingURL=JsiSkPoint.js.map