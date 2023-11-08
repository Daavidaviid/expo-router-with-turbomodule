"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsiSkTypeface = void 0;

var _Host = require("./Host");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class JsiSkTypeface extends _Host.HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "Typeface");

    _defineProperty(this, "dispose", () => {
      this.ref.delete();
    });
  }

  get bold() {
    console.warn("Typeface.bold is deprecated and will be removed in a future release. The property will return false.");
    return false;
  }

  get italic() {
    console.warn("Typeface.italic is deprecated and will be removed in a future release. The property will return false.");
    return false;
  }

  getGlyphIDs(str, numCodePoints) {
    return Array.from(this.ref.getGlyphIDs(str, numCodePoints));
  }

}

exports.JsiSkTypeface = JsiSkTypeface;
//# sourceMappingURL=JsiSkTypeface.js.map