"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawAsImage = void 0;

var _types = require("../dom/types");

var _skia = require("../skia");

var _Reconciler = require("./Reconciler");

const drawAsImage = (element, width, height) => {
  const surface = _skia.Skia.Surface.MakeOffscreen(width, height);

  if (!surface) {
    throw new Error("Could not create offscreen surface");
  }

  const canvas = surface.getCanvas();
  const root = new _Reconciler.SkiaRoot(_skia.Skia);
  root.render(element);
  const ctx = new _types.JsiDrawingContext(_skia.Skia, canvas);
  root.dom.render(ctx);
  surface.flush();
  return surface.makeImageSnapshot();
};

exports.drawAsImage = drawAsImage;
//# sourceMappingURL=Offscreen.js.map