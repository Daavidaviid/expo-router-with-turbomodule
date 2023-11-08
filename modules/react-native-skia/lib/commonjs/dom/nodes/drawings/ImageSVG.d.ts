import type { DrawingContext, ImageSVGProps } from "../../types";
import { JsiDrawingNode } from "../DrawingNode";
import type { NodeContext } from "../Node";
export declare class ImageSVGNode extends JsiDrawingNode<ImageSVGProps, Pick<ImageSVGProps, "x" | "y" | "width" | "height">> {
    constructor(ctx: NodeContext, props: ImageSVGProps);
    deriveProps(): import("../../..").SkRect | {
        x: number | undefined;
        y: number | undefined;
        width: number | undefined;
        height: number | undefined;
    };
    draw({ canvas }: DrawingContext): void;
}
