"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsiSkTextBlob = void 0;

var _Host = require("./Host");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class JsiSkTextBlob extends _Host.HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "TextBlob");

    _defineProperty(this, "dispose", () => {
      this.ref.delete();
    });
  }

}

exports.JsiSkTextBlob = JsiSkTextBlob;
//# sourceMappingURL=JsiSkTextBlob.js.map