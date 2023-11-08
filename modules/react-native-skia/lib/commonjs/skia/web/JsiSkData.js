"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsiSkData = void 0;

var _Host = require("./Host");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class JsiSkData extends _Host.HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "Data");

    _defineProperty(this, "dispose", () => {// Not implemented in data - since data is a raw ArrayBuffer
    });
  }

}

exports.JsiSkData = JsiSkData;
//# sourceMappingURL=JsiSkData.js.map