"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JsiSkTypefaceFontProvider = void 0;

var _Host = require("./Host");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class JsiSkTypefaceFontProvider extends _Host.HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "FontMgr");

    _defineProperty(this, "allocatedPointers", []);
  }

  matchFamilyStyle(_name, _style) {
    throw new _Host.NotImplementedOnRNWeb();
  }

  countFamilies() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return this.ref.countFamilies();
  }

  getFamilyName(index) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return this.ref.getFamilyName(index);
  }

  registerFont(typeface, familyName) {
    const strLen = lengthBytesUTF8(familyName) + 1; // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error

    const strPtr = this.CanvasKit._malloc(strLen);

    stringToUTF8(this.CanvasKit, familyName, strPtr, strLen); // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error

    this.ref._registerFont(typeface.ref, strPtr);
  }

  dispose() {
    for (const ptr of this.allocatedPointers) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this.CanvasKit._free(ptr);
    }

    this.ref.delete();
  }

}

exports.JsiSkTypefaceFontProvider = JsiSkTypefaceFontProvider;

const lengthBytesUTF8 = str => {
  // TextEncoder will give us the byte length in UTF8 form
  const encoder = new TextEncoder();
  const utf8 = encoder.encode(str);
  return utf8.length;
};

const stringToUTF8 = (CanvasKit, str, outPtr, maxBytesToWrite) => {
  // TextEncoder will give us the byte array in UTF8 form
  const encoder = new TextEncoder();
  const utf8 = encoder.encode(str); // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error

  const heap = CanvasKit.HEAPU8; // Check if there's enough space

  if (utf8.length > maxBytesToWrite) {
    throw new Error("Not enough space to write UTF8 encoded string");
  } // Copy the bytes


  for (let i = 0; i < utf8.length; i++) {
    heap[outPtr + i] = utf8[i];
  } // Null terminate


  if (utf8.length < maxBytesToWrite) {
    heap[outPtr + utf8.length] = 0;
  }
};
//# sourceMappingURL=JsiSkTypefaceFontProvider.js.map