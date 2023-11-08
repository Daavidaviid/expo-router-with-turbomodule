"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsiSkPicture = void 0;

var _Host = require("./Host");

var _JsiSkShader = require("./JsiSkShader");

var _JsiSkMatrix = require("./JsiSkMatrix");

var _JsiSkRect = require("./JsiSkRect");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // TODO: suggest to rename SkPicture to Picture for consistency


class JsiSkPicture extends _Host.HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "Picture");

    _defineProperty(this, "dispose", () => {
      this.ref.delete();
    });
  }

  makeShader(tmx, tmy, mode, localMatrix, tileRect) {
    return new _JsiSkShader.JsiSkShader(this.CanvasKit, this.ref.makeShader((0, _Host.ckEnum)(tmx), (0, _Host.ckEnum)(tmy), (0, _Host.ckEnum)(mode), localMatrix ? _JsiSkMatrix.JsiSkMatrix.fromValue(localMatrix) : undefined, tileRect ? _JsiSkRect.JsiSkRect.fromValue(this.CanvasKit, tileRect) : undefined));
  }

  serialize() {
    return this.ref.serialize();
  }

}

exports.JsiSkPicture = JsiSkPicture;
//# sourceMappingURL=JsiSkPicture.js.map