/* eslint-disable @typescript-eslint/no-explicit-any */
import { processRadius } from "./Radius";
export const isEdge = (pos, b) => {
  "worklet";

  return pos.x === b.x || pos.y === b.y || pos.x === b.width || pos.y === b.height;
}; // We have an issue to check property existence on JSI backed instances

const isRRectCtor = def => def.rect === undefined; // We have an issue to check property existence on JSI backed instances


const isRectCtor = def => def.rect === undefined;

export const processRect = (Skia, def) => {
  if (isRectCtor(def)) {
    var _def$x, _def$y;

    return Skia.XYWHRect((_def$x = def.x) !== null && _def$x !== void 0 ? _def$x : 0, (_def$y = def.y) !== null && _def$y !== void 0 ? _def$y : 0, def.width, def.height);
  } else {
    return def.rect;
  }
};
export const processRRect = (Skia, def) => {
  if (isRRectCtor(def)) {
    var _def$r, _def$x2, _def$y2;

    const r = processRadius(Skia, (_def$r = def.r) !== null && _def$r !== void 0 ? _def$r : 0);
    return Skia.RRectXY(Skia.XYWHRect((_def$x2 = def.x) !== null && _def$x2 !== void 0 ? _def$x2 : 0, (_def$y2 = def.y) !== null && _def$y2 !== void 0 ? _def$y2 : 0, def.width, def.height), r.x, r.y);
  } else {
    return def.rect;
  }
};
//# sourceMappingURL=Rect.js.map