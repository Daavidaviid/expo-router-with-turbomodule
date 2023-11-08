"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  draw: true
};
exports.draw = void 0;

var _web = require("../skia/web");

var _Reconciler = require("../renderer/Reconciler");

var _types = require("../dom/types");

var _components = require("../renderer/components");

Object.keys(_components).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _components[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _components[key];
    }
  });
});
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let Skia;

const draw = (element, width, height) => {
  if (!Skia) {
    Skia = (0, _web.JsiSkApi)(CanvasKit);
  }

  const surface = Skia.Surface.MakeOffscreen(width, height);

  if (surface === null) {
    throw new Error("Couldn't create surface!");
  }

  const root = new _Reconciler.SkiaRoot(Skia);
  root.render(element);
  const canvas = surface.getCanvas();
  const ctx = new _types.JsiDrawingContext(Skia, canvas);
  root.dom.render(ctx);
  surface.flush();
  const image = surface.makeImageSnapshot();
  return image;
};

exports.draw = draw;
//# sourceMappingURL=index.js.map