"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toBase64String = exports.JsiSkImage = void 0;

var _Host = require("./Host");

var _JsiSkMatrix = require("./JsiSkMatrix");

var _JsiSkShader = require("./JsiSkShader");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// https://github.com/google/skia/blob/1f193df9b393d50da39570dab77a0bb5d28ec8ef/modules/canvaskit/htmlcanvas/util.js
const toBase64String = bytes => {
  if (typeof Buffer !== "undefined") {
    // Are we on node?
    return Buffer.from(bytes).toString("base64");
  } else {
    // From https://stackoverflow.com/a/25644409
    // because the naive solution of
    //     btoa(String.fromCharCode.apply(null, bytes));
    // would occasionally throw "Maximum call stack size exceeded"
    var CHUNK_SIZE = 0x8000; //arbitrary number

    var index = 0;
    var {
      length
    } = bytes;
    var result = "";
    var slice;

    while (index < length) {
      slice = bytes.slice(index, Math.min(index + CHUNK_SIZE, length)); // eslint-disable-next-line @typescript-eslint/no-explicit-any

      result += String.fromCharCode.apply(null, slice);
      index += CHUNK_SIZE;
    }

    return btoa(result);
  }
};

exports.toBase64String = toBase64String;

class JsiSkImage extends _Host.HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "Image");

    _defineProperty(this, "dispose", () => {
      this.ref.delete();
    });
  }

  height() {
    return this.ref.height();
  }

  width() {
    return this.ref.width();
  }

  makeShaderOptions(tx, ty, fm, mm, localMatrix) {
    return new _JsiSkShader.JsiSkShader(this.CanvasKit, this.ref.makeShaderOptions((0, _Host.ckEnum)(tx), (0, _Host.ckEnum)(ty), (0, _Host.ckEnum)(fm), (0, _Host.ckEnum)(mm), localMatrix ? _JsiSkMatrix.JsiSkMatrix.fromValue(localMatrix) : undefined));
  }

  makeShaderCubic(tx, ty, B, C, localMatrix) {
    return new _JsiSkShader.JsiSkShader(this.CanvasKit, this.ref.makeShaderCubic((0, _Host.ckEnum)(tx), (0, _Host.ckEnum)(ty), B, C, localMatrix ? _JsiSkMatrix.JsiSkMatrix.fromValue(localMatrix) : undefined));
  }

  encodeToBytes(fmt, quality) {
    let result;

    if (fmt && quality) {
      result = this.ref.encodeToBytes((0, _Host.ckEnum)(fmt), quality);
    } else if (fmt) {
      result = this.ref.encodeToBytes((0, _Host.ckEnum)(fmt));
    } else {
      result = this.ref.encodeToBytes();
    }

    if (!result) {
      throw new Error("encodeToBytes failed");
    }

    return result;
  }

  encodeToBase64(fmt, quality) {
    const bytes = this.encodeToBytes(fmt, quality);
    return toBase64String(bytes);
  }

  makeNonTextureImage() {
    return new JsiSkImage(this.CanvasKit, this.CanvasKit.MakeImageFromEncoded(this.encodeToBytes()));
  }

}

exports.JsiSkImage = JsiSkImage;
//# sourceMappingURL=JsiSkImage.js.map