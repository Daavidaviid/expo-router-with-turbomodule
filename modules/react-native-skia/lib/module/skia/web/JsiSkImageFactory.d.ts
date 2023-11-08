import type { CanvasKit } from "canvaskit-wasm";
import type { SkData, ImageInfo, SkImage } from "../types";
import type { ImageFactory } from "../types/Image/ImageFactory";
import { Host } from "./Host";
import { JsiSkImage } from "./JsiSkImage";
export declare class JsiSkImageFactory extends Host implements ImageFactory {
    constructor(CanvasKit: CanvasKit);
    MakeImageFromViewTag(viewTag: number): Promise<SkImage | null>;
    MakeImageFromEncoded(encoded: SkData): JsiSkImage | null;
    MakeImage(info: ImageInfo, data: SkData, bytesPerRow: number): JsiSkImage | null;
}
