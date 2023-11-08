"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsiSkPictureRecorder = void 0;

var _Host = require("./Host");

var _JsiSkCanvas = require("./JsiSkCanvas");

var _JsiSkPicture = require("./JsiSkPicture");

var _JsiSkRect = require("./JsiSkRect");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class JsiSkPictureRecorder extends _Host.HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "PictureRecorder");

    _defineProperty(this, "dispose", () => {
      this.ref.delete();
    });
  }

  beginRecording(bounds) {
    return new _JsiSkCanvas.JsiSkCanvas(this.CanvasKit, this.ref.beginRecording(_JsiSkRect.JsiSkRect.fromValue(this.CanvasKit, bounds)));
  }

  finishRecordingAsPicture() {
    return new _JsiSkPicture.JsiSkPicture(this.CanvasKit, this.ref.finishRecordingAsPicture());
  }

}

exports.JsiSkPictureRecorder = JsiSkPictureRecorder;
//# sourceMappingURL=JsiSkPictureRecorder.js.map