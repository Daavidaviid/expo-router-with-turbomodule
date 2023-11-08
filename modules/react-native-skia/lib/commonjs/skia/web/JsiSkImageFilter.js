"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsiSkImageFilter = void 0;

var _Host = require("./Host");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class JsiSkImageFilter extends _Host.HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "ImageFilter");

    _defineProperty(this, "dispose", () => {
      this.ref.delete();
    });
  }

}

exports.JsiSkImageFilter = JsiSkImageFilter;
//# sourceMappingURL=JsiSkImageFilter.js.map