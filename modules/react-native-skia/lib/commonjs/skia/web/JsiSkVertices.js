"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsiSkVertices = void 0;

var _Host = require("./Host");

var _JsiSkRect = require("./JsiSkRect");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class JsiSkVertices extends _Host.HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "Vertices");

    _defineProperty(this, "dispose", () => {
      this.ref.delete();
    });
  }

  bounds() {
    return new _JsiSkRect.JsiSkRect(this.CanvasKit, this.ref.bounds());
  }

  uniqueID() {
    return this.ref.uniqueID();
  }

}

exports.JsiSkVertices = JsiSkVertices;
//# sourceMappingURL=JsiSkVertices.js.map