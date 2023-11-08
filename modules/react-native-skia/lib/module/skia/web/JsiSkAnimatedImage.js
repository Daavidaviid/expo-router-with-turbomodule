function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { HostObject } from "./Host";
import { JsiSkImage } from "./JsiSkImage";
export class JsiSkAnimatedImage extends HostObject {
  constructor(CanvasKit, ref) {
    super(CanvasKit, ref, "AnimatedImage");

    _defineProperty(this, "dispose", () => {
      this.ref.delete();
    });
  }

  decodeNextFrame() {
    return this.ref.decodeNextFrame();
  }

  currentFrameDuration() {
    return this.ref.currentFrameDuration();
  }

  getCurrentFrame() {
    const image = this.ref.makeImageAtCurrentFrame();

    if (image === null) {
      return null;
    }

    return new JsiSkImage(this.CanvasKit, image);
  }

}
//# sourceMappingURL=JsiSkAnimatedImage.js.map