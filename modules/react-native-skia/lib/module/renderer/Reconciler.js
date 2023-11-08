function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import ReactReconciler from "react-reconciler";
import { DependencyManager } from "./DependencyManager";
import { skHostConfig, debug as hostDebug } from "./HostConfig";
import { Container } from "./Container";
import { NATIVE_DOM } from "./HostComponents";
const skiaReconciler = ReactReconciler(skHostConfig);

const createDependencyManager = registerValues => NATIVE_DOM ? global.SkiaDomApi.DependencyManager(registerValues) : new DependencyManager(registerValues);

skiaReconciler.injectIntoDevTools({
  bundleType: 1,
  version: "0.0.1",
  rendererPackageName: "react-native-skia"
});
export class SkiaRoot {
  constructor(Skia) {
    let registerValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => () => {};
    let redraw = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : () => {};
    let getNativeId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : () => 0;

    _defineProperty(this, "root", void 0);

    _defineProperty(this, "container", void 0);

    const depMgr = createDependencyManager(registerValues);
    this.container = new Container(Skia, depMgr, redraw, getNativeId);
    this.root = skiaReconciler.createContainer(this.container, 0, null, true, null, "", console.error, null);
  }

  render(element) {
    skiaReconciler.updateContainer(element, this.root, null, () => {
      hostDebug("updateContainer");
    });
  }

  unmount() {
    skiaReconciler.updateContainer(null, this.root, null, () => {
      this.container.depMgr.remove();
    });
  }

  get dom() {
    return this.container.root;
  }

}
//# sourceMappingURL=Reconciler.js.map