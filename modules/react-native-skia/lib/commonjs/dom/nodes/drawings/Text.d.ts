import type { SkTextBlob, SkPoint, SkFont } from "../../../skia/types";
import type { DrawingContext, TextBlobProps, TextPathProps, TextProps } from "../../types";
import type { GlyphsProps } from "../../types/Drawings";
import { JsiDrawingNode } from "../DrawingNode";
import type { NodeContext } from "../Node";
export declare class TextNode extends JsiDrawingNode<TextProps, SkFont | null> {
    constructor(ctx: NodeContext, props: TextProps);
    protected deriveProps(): SkFont | null;
    draw({ canvas, paint }: DrawingContext): void;
}
export declare class TextPathNode extends JsiDrawingNode<TextPathProps, SkTextBlob | null> {
    constructor(ctx: NodeContext, props: TextPathProps);
    deriveProps(): SkTextBlob | null;
    draw({ canvas, paint }: DrawingContext): void;
}
export declare class TextBlobNode extends JsiDrawingNode<TextBlobProps, null> {
    constructor(ctx: NodeContext, props: TextBlobProps);
    protected deriveProps(): null;
    draw({ canvas, paint }: DrawingContext): void;
}
interface ProcessedGlyphs {
    glyphs: number[];
    positions: SkPoint[];
}
export declare class GlyphsNode extends JsiDrawingNode<GlyphsProps, ProcessedGlyphs> {
    constructor(ctx: NodeContext, props: GlyphsProps);
    deriveProps(): ProcessedGlyphs;
    draw({ canvas, paint }: DrawingContext): void;
}
export {};
