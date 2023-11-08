import type { SkCanvas, SkPaint, Skia } from "../../skia/types";
import type { PaintProps } from "./Common";
import { DeclarationContext } from "./DeclarationContext";
import type { Node } from "./Node";
export interface DrawingContext {
    canvas: SkCanvas;
    paint: SkPaint;
    saveAndConcat(node: Node<PaintProps>, cache?: SkPaint): boolean;
    restore(): void;
    declarationCtx: DeclarationContext;
}
export declare class JsiDrawingContext implements DrawingContext {
    private readonly Skia;
    readonly canvas: SkCanvas;
    paints: SkPaint[];
    declarationCtx: DeclarationContext;
    constructor(Skia: Skia, canvas: SkCanvas);
    get paint(): SkPaint;
    private save;
    restore(): void;
    saveAndConcat(node: Node<PaintProps>, cache?: SkPaint): boolean;
}
