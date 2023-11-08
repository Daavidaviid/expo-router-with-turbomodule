"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsiSkContourMeasureIter = void 0;

var _Host = require("./Host");

var _JsiSkContourMeasure = require("./JsiSkContourMeasure");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class JsiSkContourMeasureIter extends _Host.HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "ContourMeasureIter");

    _defineProperty(this, "dispose", () => {
      this.ref.delete();
    });
  }

  next() {
    const result = this.ref.next();

    if (result === null) {
      return null;
    }

    return new _JsiSkContourMeasure.JsiSkContourMeasure(this.CanvasKit, result);
  }

}

exports.JsiSkContourMeasureIter = JsiSkContourMeasureIter;
//# sourceMappingURL=JsiSkContourMeasureIter.js.map