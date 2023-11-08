"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsiSkMatrix = void 0;

var _Host = require("./Host");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class JsiSkMatrix extends _Host.HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "Matrix");

    _defineProperty(this, "dispose", () => {// Do nothing - the matrix is represenetd by a Float32Array
    });
  }

  preMultiply(matrix) {
    this.ref.set(this.CanvasKit.Matrix.multiply(this.ref, matrix));
  }

  postMultiply(matrix) {
    this.ref.set(this.CanvasKit.Matrix.multiply(matrix, this.ref));
  }

  concat(matrix) {
    this.preMultiply(JsiSkMatrix.fromValue(matrix));
    return this;
  }

  translate(x, y) {
    this.preMultiply(this.CanvasKit.Matrix.translated(x, y));
    return this;
  }

  postTranslate(x, y) {
    this.postMultiply(this.CanvasKit.Matrix.translated(x, y));
    return this;
  }

  scale(x, y) {
    this.preMultiply(this.CanvasKit.Matrix.scaled(x, y ?? x));
    return this;
  }

  postScale(x, y) {
    this.postMultiply(this.CanvasKit.Matrix.scaled(x, y ?? x));
    return this;
  }

  skew(x, y) {
    this.preMultiply(this.CanvasKit.Matrix.skewed(x, y));
    return this;
  }

  postSkew(x, y) {
    this.postMultiply(this.CanvasKit.Matrix.skewed(x, y));
    return this;
  }

  rotate(value) {
    this.preMultiply(this.CanvasKit.Matrix.rotated(value));
    return this;
  }

  postRotate(value) {
    this.postMultiply(this.CanvasKit.Matrix.rotated(value));
    return this;
  }

  identity() {
    this.ref.set(this.CanvasKit.Matrix.identity());
    return this;
  }

  get() {
    return Array.from(this.ref);
  }

}

exports.JsiSkMatrix = JsiSkMatrix;
//# sourceMappingURL=JsiSkMatrix.js.map